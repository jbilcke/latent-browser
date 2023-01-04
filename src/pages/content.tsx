import { useCallback, useEffect, useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'
import { v4 as uuidv4 } from 'uuid'
import { imagineHTML, imagineJSON, imagineScript } from '../providers/openai'
import { resolveImages } from '../engine/resolvers/image'
import {
  htmlPrompt,
  scriptPrompt,
  subHtmlPrompt,
  tasksPrompt,
  type Tasks,
} from '../engine/prompts/content'
import { ModelProgressBar } from '../components/loaders/ModelProgressBar'
import { useInterval } from '../hooks/useInterval'
import { type AppTab } from '../types'
import { useOpenTabs } from '../hooks/useOpenTabs'
import { useStoredApps } from '../hooks/useStoredApps'
import { readParam } from '../utils/readParam'
import { useSettings } from '../hooks/useSettings'
import { getKeyForApps } from '../utils/getKeyForApps'
import { useParam } from '../hooks/useParam'

const timePerStage = {
  TASKS: 15,
  HTML: 25,
  SCRIPT: 40,
}
function Content() {
  const [storedApps, setStoredApps] = useStoredApps()
  const [settings] = useSettings()
  const [openTabs, setOpenTabs] = useOpenTabs()
  const isLoading = !settings || !storedApps || !openTabs

  // const id = readParam('id', '')
  const id = useParam('id', '')

  const [stage, setStage] = useState<'HTML' | 'SCRIPT' | 'TASKS' | 'TEXT'>(
    'TASKS'
  )

  // note: we must make rehydration async to make the SSR happy
  const [prompt, setPrompt] = useState<string>('')
  const [tasks, setTasks] = useState<Tasks>({} as Tasks)
  const [html, setHtml] = useState<string>('')
  const [script, setScript] = useState<string>('')
  const [text, setText] = useState<Record<string, any>>({})
  const [data, setData] = useState<Record<string, any>>({})

  useEffect(() => {
    console.log('primary use effect to init the app', {
      isLoading,
      id,
      openTabs,
    })
    if (isLoading || !openTabs.length) {
      return
    }
    const app: AppTab = openTabs.find((a) => a.id === id)
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
      window['appData'] = JSON.parse(JSON.stringify(app.data)) || {}
    } catch (err) {
      window['appData'] = {}
    }
    setData(window['appData'])

    setScript(app.script)
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

  const updateApp = (extra?: Partial<AppTab>) => {
    setOpenTabs((tabs) =>
      tabs.map((a) =>
        a.id === id
          ? {
              ...a,
              prompt,
              tasks,
              html: document.getElementById('html-tag')?.innerHTML || '',
              script,
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
        apiKey
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

  const generateHTML = async (tasks: Tasks = {}) => {
    console.log(`tab.content(${id}): generateHTML`)
    if (!tasks || !Object.keys(tasks).length) {
      return
    }

    setIsLoadingAssets(true)
    setStartTimestamp(new Date().valueOf())
    setElapsedTimeMs(0)
    setStage('HTML')

    let best = ''

    try {
      best = await imagineHTML(htmlPrompt(tasks), model, apiKey)
    } catch (exc) {
      console.error(`tab.content(${id}): generateHTML: failed`, exc)
      setIsLoadingAssets(false)
      return
    }

    if (!best) {
      console.error(
        `tab.content(${id}): generateHTML: did not get enough results, aborting`
      )
      setIsLoadingAssets(false)
      return
    }

    setHtml(best)
    setIsLoadingAssets(false)
  }

  const generateScript = async () => {
    console.log(`tab.content(${id}): generateScript`)
    // something went wrong, we cannot generate JS over garbage
    if (html.length < 10) {
      console.error(
        `tab.content(${id}): generateScript: html is less than 10 characters, aborting`
      )
      return
    }

    setIsLoadingAssets(true)
    setStartTimestamp(new Date().valueOf())
    setElapsedTimeMs(0)
    setStage('SCRIPT')

    window['appData'] = data

    window['generateHTMLContent'] = async (query = '') => {
      console.log(
        `tab.content(${id}): generateHTMLContent called by AI script`,
        query
      )
      query = query.trim()
      if (!query.length) {
        return
      }
      setStage('HTML')
      imagineHTML(subHtmlPrompt(query), model, apiKey)
    }

    let best = ''

    try {
      best = await imagineScript(scriptPrompt(prompt, html), model, apiKey)
      if (!best) {
        throw new Error('did not get enough results, aborting')
      }
    } catch (exc) {
      console.error(`tab.content(${id}): generateScript failed`, exc)
      setIsLoadingAssets(false)
      setScript('')
      updateApp({ script: '' })
      return
    }

    // replaceImages()
    console.log(`tab.content(${id}): generateScript: loading script`, best)

    setScript(best)
    setIsLoadingAssets(false)
    updateApp({ script: best })
  }

  useEffect(() => {
    console.log(
      `tab.content(${id}): prompt changed! seeing if we should generate tasks..'`,
      { prompt }
    )

    if (Object.keys(tasks).length === 0) {
      generateTasks(prompt)
    }
  }, [prompt])

  useEffect(() => {
    console.log(
      `tab.content(${id}): tasks changed! seeing if we should generate html..`,
      { tasks }
    )
    if (!html.length) {
      console.log(`tab.content(${id}): html is empty! generating new one..`)
      generateHTML(tasks)
    }
  }, [JSON.stringify(tasks)])

  useEffect(() => {
    console.log(
      `tab.content(${id}): html changed! seeing if we should generate script..`,
      { html }
    )
    if (!script.length) {
      console.log(`tab.content(${id}): script is empty! generating new one..`)
      generateScript()
    }
  }, [html])

  // replace all images alt with src
  useEffect(() => {
    const resolve = async () => {
      await resolveImages(model, apiKey)
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
      <script src="https://unpkg.com/tween@0.9.0/tween.js" />
      {/* <script src="https://unpkg.com/canvas-utils@0.8.0/es5-generated/index.js" />*/}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.js" />
      <script src="https://cdn.jsdelivr.net/npm/three@0.124.0/examples/js/controls/FirstPersonControls.js" />
      <script src="https://cdn.jsdelivr.net/npm/three@0.124.0/examples/js/controls/FlyControls.js" />
      <script src="https://cdn.jsdelivr.net/npm/three@0.124.0/examples/js/controls/OrbitControls.js" />
      {html?.length ? (
        <InnerHTML
          id="html-tag"
          className="pt-20 flex w-full items-center flex-col"
          html={html}
        />
      ) : null}
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
