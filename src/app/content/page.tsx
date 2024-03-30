"use client"

import { useEffect, useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'

import { imagineHTML, imagineJSON, imagineScript } from '../../providers/openai'
import { resolveImages } from '../../engine/resolvers/image'
import { layoutPrompt } from '../../engine/prompts/layout'
// import { contentPrompt } from '../../engine/prompts/content'
import { scriptPrompt } from '../../engine/prompts/script'
import {
  getInstructions,
  tasksPrompt,
  // tasksValues,
} from '../../engine/prompts/tasks'
import { type Tasks } from '../../engine/prompts/types'

import { ModelProgressBar } from '../../components/loaders/ModelProgressBar'
import {
  useInterval,
  useOpenTabs,
  useStoredApps,
  useSettings,
  useParam,
} from '../../hooks'
// import { readParam } from '../../utils/readParam'
import { getKeyForApps } from '../../utils/getKeyForApps'
import { type TaskStage, type AppTab } from '../../types'

const timePerStage: Record<TaskStage, number> = {
  INIT: 50,
  TASKS: 15,
  LAYOUT: 25,
  CONTENT: 25,
  SCRIPT: 40,
  TEXT: 50,
  LOADED: 50,
  CRUD: 50,
}

function Content() {
  const [storedApps, setStoredApps] = useStoredApps()
  const [settings] = useSettings()
  const [openTabs, setOpenTabs] = useOpenTabs()
  const isLoading = !settings || !storedApps || !openTabs

  // const id = readParam('id', '')
  const id = useParam('id', '')

  const [stage, setStage] = useState<TaskStage>('TASKS')

  // note: we must make rehydration async to make the SSR happy
  const [prompt, setPrompt] = useState<string>('')
  const [tasks, setTasks] = useState<Tasks>({} as Tasks)
  const [html, setHtml] = useState<string>('')
  const [script, setScript] = useState<string>('')
  const [trials, setTrials] = useState<number>(0)
  const [text, setText] = useState<Record<string, any>>({})
  const [data, setData] = useState<Record<string, any>>({})
  const instructions = getInstructions(tasks)

  useEffect(() => {
    console.log('primary use effect to init the app', {
      isLoading,
      id,
      openTabs,
    })
    if (isLoading || !openTabs.length) {
      return
    }
    const app: AppTab | undefined = openTabs.find((a) => a.id === id)
    if (!app) {
      console.log(`couldn\'t find app ${id} inside:`, openTabs)
      return
    }

    console.log(`tab.content(${id}): app id changed and open tabs are ready!`, {
      id,
    })

    setPrompt(app.prompt || '')
    setTasks(app.tasks || {})
    setHtml(app.html || '')
    setText(app.text || {})

    // we expose a global window object that GPT-3 can use later
    try {
      (window as any)['appData'] = JSON.parse(JSON.stringify(app.data)) || {}
    } catch (err) {
      (window as any)['appData'] = {}
    }
    setData((window as any)['appData'])

    setScript(app.script)

    if (app.html?.length > 0) {
      setStage('LOADED')
    }
  }, [isLoading, id, getKeyForApps(openTabs)])

  // TODO use a download queue to estimate the remaining loading time
  // const [queue, setQueue] = useState<string[]>([])

  // with the new code splitting the initial loading is much faster
  let estimatedTimeSec = timePerStage[stage] || 50

  const [startTimestamp, setStartTimestamp] = useState<number>(0)
  const [elapsedTimeMs, setElapsedTimeMs] = useState<number>(0)
  const [isLoadingAssets, setIsLoadingAssets] = useState<boolean>(false)

  const model = settings?.openAIModel
  const apiKey = settings?.openAIKey
  const mockData = settings?.useMockData

  const updateApp = (extra?: Partial<AppTab>) => {
    setOpenTabs((tabs) =>
      tabs.map((a) =>
        a.id === id
          ? {
              ...a,
              prompt,
              tasks,
              html: document.getElementById('html-tag')?.innerHTML || '',
              script: document.getElementById('script-tag')?.innerHTML || '',
              text,
              data,
              ...extra,
            }
          : a
      )
    )
  }

  const generateTasks = async (prompt = '') => {
    console.log(`tab.content(${id}): generateTasks for prompt`, { prompt })
    if (!prompt.length) {
      return
    }

    setIsLoadingAssets(true)
    setStartTimestamp(new Date().valueOf())
    setElapsedTimeMs(0)
    setStage('TASKS')

    let tasks: Tasks = {}

    try {
      tasks = await imagineJSON<Tasks>(
        tasksPrompt(prompt),
        {},
        '{',
        model,
        apiKey,
        mockData
      )
    } catch (exc) {
      console.error(`tab.content(${id}): generateTasks: failed`, exc)
      setIsLoadingAssets(false)
      setScript('')
      return
    }

    if (!tasks || !Object.keys(tasks).length) {
      console.log(
        `tab.content(${id}): generateTasks: did not get enough tasks, aborting`
      )
      setIsLoadingAssets(false)
      setScript('')
      return
    }
    // replaceImages()

    console.log(`tab.content(${id}): generateTasks: loading tasks`)

    setTasks(tasks)
    setIsLoadingAssets(false)
  }

  const generateHtml = async (tasks: Tasks = {}) => {
    console.log(`tab.content(${id}): generateHtml`)
    if (!tasks || !Object.keys(tasks).length) {
      return
    }

    setIsLoadingAssets(true)
    setStartTimestamp(new Date().valueOf())
    setElapsedTimeMs(0)
    setStage('LAYOUT')

    let firstPass = ''

    try {
      firstPass = await imagineHTML(
        layoutPrompt(instructions),
        model,
        apiKey,
        mockData
      )
      if (!firstPass) {
        throw new Error('did not get enough results, aborting')
      }
    } catch (exc) {
      console.error(`tab.content(${id}): generateHTML: failed`, exc)
      setStage('LOADED')
      setIsLoadingAssets(false)
      return
    }

    setHtml(firstPass)

    /*
    let secondPass = ''

    try {
      secondPass = await imagineHTML(
        contentPrompt(firstPass, tasks),
        model,
        apiKey,
        mockData
      )
      if (!secondPass) {
        throw new Error('did not get enough results, aborting')
      }
    } catch (exc) {
      console.error(`tab.content(${id}): generateHTML: failed`, exc)
      setStage('LOADED')
      setIsLoadingAssets(false)
      return
    }

    setHtml(secondPass)
    */

    setIsLoadingAssets(false)
  }

  const generateScript = async () => {
    console.log(`tab.content(${id}): generateScript`)
    // something went wrong, we cannot generate JS over garbage
    if (html.length < 10) {
      console.error(
        `tab.content(${id}): generateScript: html is less than 10 characters, aborting`
      )
      setStage('LOADED')
      return
    }

    // normally the LLM gives us a hint about the need for JS
    const canSkip =
      !instructions.script ||
      !instructions.script.length ||
      instructions.script.some((instruction) =>
        instruction.match(/no\s+(?:js|javascript)\s+(?:needed|required)/i)
      )

    if (canSkip) {
      console.error(
        `tab.content(${id}): the LLM asked us to skip SCRIPT generation`
      )
      setStage('LOADED')
      setIsLoadingAssets(false)
      setScript('')
      updateApp({ script: '' })
      return
    }

    setIsLoadingAssets(true)
    setStartTimestamp(new Date().valueOf())
    setElapsedTimeMs(0)
    setStage('SCRIPT')
    setTrials(trials + 1)

    ;(window as any)['appData'] = data;

    /*
    TODO: we need two functions
    - one to generate GPT-3 results (in JSON)
    - one for real CRUD operation (to the local storage)
    window['callAPI'] = async (query = '') => {
      console.log(
        `tab.content(${id}): generateHTMLContent called by AI script`,
        query
      )
      query = query.trim()
      if (!query.length) {
        return
      }
      setStage('INTERNAL')
      imagineJSON<Record<string, any>>(
        recursivePrompt(query),
        {},
        '{',
        model,
        apiKey,
        mockData
      )
    }
    */

    let script = ''

    try {
      script = await imagineScript(
        scriptPrompt(instructions, html),
        model,
        apiKey,
        mockData
      )
      if (!script) {
        throw new Error('did not get enough results, aborting')
      }
      if (script.includes('// TODO')) {
        throw new Error('script generated TODOs, aborting')
      }
    } catch (exc) {
      console.error(`tab.content(${id}): generateScript failed`, exc)

      // we try again!
      if (settings.useAutoCherryPick) {
        try {
          script = await imagineScript(
            scriptPrompt(instructions, html),
            model,
            apiKey,
            mockData
          )
          if (!script) {
            throw new Error('did not get enough results, aborting')
          }
          if (script.includes('// TODO')) {
            throw new Error('script generated TODOs, aborting')
          }
        } catch (exc) {
          console.error(`tab.content(${id}): generateScript failed`, exc)
          setStage('LOADED')
          setIsLoadingAssets(false)
          setScript('')
          updateApp({ script: '' })
          return
        }
      }
    }

    // replaceImages()
    console.log(`tab.content(${id}): generateScript: loading script`, script)
    setStage('LOADED')
    setScript(script)
    setIsLoadingAssets(false)
    updateApp({ script })
  }

  useEffect(() => {
    console.log(
      `tab.content(${id}): prompt changed! seeing if we should generate tasks..'`,
      { prompt }
    )

    if (Object.keys(tasks).length === 0 && stage !== 'LOADED') {
      generateTasks(prompt)
    }
  }, [prompt])

  useEffect(() => {
    console.log(
      `tab.content(${id}): tasks changed! seeing if we should generate the html..`,
      { tasks }
    )
    if (!html.length && stage !== 'LOADED') {
      console.log(`tab.content(${id}): html is empty! generating new one..`)
      generateHtml(tasks)
    }
  }, [JSON.stringify(tasks)])

  useEffect(() => {
    console.log(
      `tab.content(${id}): html changed! seeing if we should generate script..`,
      { html }
    )
    if (html && !script.length && stage !== 'LOADED') {
      console.log(
        `tab.content(${id}): script is empty and we are not loaded! generating new one..`
      )
      generateScript()
    }
  }, [html, stage])

  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      console.log('SCRIPT failure detected:', e)
      setScript('')
      if (settings.useAutoCherryPick && trials < 2) {
        console.log('auto cherry-pick enabled, so trying once again.. 💸')
        generateScript()
      }
    }

    window.addEventListener('error', onError)

    return () => window.removeEventListener('error', onError)
  }, [settings.useAutoCherryPick, trials])

  // replace all images alt with src
  useEffect(() => {
    const resolve = async () => {
      await resolveImages(model, apiKey, mockData)
      updateApp()
    }
    resolve()
  }, [html])

  useInterval(
    () => {
      setElapsedTimeMs(new Date().valueOf() - startTimestamp)
    },
    // Delay in milliseconds or null to stop it
    isLoadingAssets ? 200 : null
  )

  return (
    <>
      {/* <script type="module" doesn't work, so I don't have a lot of choices */}
      <script src="https://code.jquery.com/jquery-3.6.1.min.js" />
      <script src="https://unpkg.com/lodash@4.17.21/lodash.js" />
      <script src="https://unpkg.com/tone@14.7.77/build/Tone.js" />
      {/*<script src="https://unpkg.com/tween@0.9.0/tween.js" /> */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js" />
      {/* <script src="https://unpkg.com/canvas-utils@0.8.0/es5-generated/index.js" />*/}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.js" />
      <script src="https://cdn.jsdelivr.net/npm/three@0.124.0/examples/js/controls/FirstPersonControls.js" />
      <script src="https://cdn.jsdelivr.net/npm/three@0.124.0/examples/js/controls/FlyControls.js" />
      <script src="https://cdn.jsdelivr.net/npm/three@0.124.0/examples/js/controls/OrbitControls.js" />
      {html?.length ? <InnerHTML id="html-tag" html={html} /> : null}
      {script?.length ? <InnerHTML id="script-tag" html={script} /> : null}
      <ModelProgressBar
        elapsedTimeMs={elapsedTimeMs}
        estimatedTimeSec={estimatedTimeSec}
        isLoading={isLoadingAssets}
        model={model}
        provider="OpenAI"
        stage={stage}
      />
    </>
  )
}

export default Content
