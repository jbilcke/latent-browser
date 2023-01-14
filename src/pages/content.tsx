import { useEffect, useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'
import { imagineJSON, imagineScene } from '../providers/openai'
import { resolveImages } from '../engine/resolvers/image'
import {
  getPlannerPrompt,
  getBuilderPrompt,
  getImproverPrompt,
  getFinalSpec,
  type RawSpecification,
  type Scene,
  type Specification,
} from '../engine/prompts'
import { ModelProgressBar, SceneRenderer } from '../components'
import {
  useInterval,
  useOpenTabs,
  useStoredApps,
  useSettings,
  useParam,
} from '../hooks'
import { getKeyForApps, getNewEmptySpec, isSceneEmpty } from '../utils'
import { type AppTab } from '../types'
import { isSpecEmpty } from '../utils/isSpecEmpty'
import { apiDoc } from '../plugins'

const timePerStage = {
  PLAN: 15,
  BUILD: 25,
  IMPROVE: 25,
}
function Content() {
  const [storedApps, setStoredApps] = useStoredApps()
  const [settings] = useSettings()
  const [openTabs, setOpenTabs] = useOpenTabs()
  const isLoading = !settings || !storedApps || !openTabs

  // const id = readParam('id', '')
  const id = useParam('id', '')

  const [stage, setStage] = useState<
    'INIT' | 'PLAN' | 'BUILD' | 'IMPROVE' | 'LOADED' | 'CRUD'
  >('INIT')

  // TODO this is new, let's use this for cool stuff!
  // store data, images etc
  // const storedApp = useStoredApp(id)

  // note: we must make rehydration async to make the SSR happy
  const [prompt, setPrompt] = useState<string>('')

  // contains the specification of the scene
  const [spec, setSpec] = useState<Specification>()
  const [scene, setScene] = useState<Scene>()
  const [trials, setTrials] = useState<number>(0) // used to count attempts, but we may not need this anymore
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
      console.log(
        `tab.content(${id}): couldn\'t find app ${id} inside:`,
        openTabs
      )
      return
    }

    console.log(`tab.content(${id}): app id changed and open tabs are ready!`, {
      id,
    })

    setSpec(app.spec)
    setScene(app.scene)
    setPrompt(app.prompt)

    // we expose a global window object that GPT-3 can use later
    /*
    try {
      window['appData'] = JSON.parse(JSON.stringify(app.data)) || {}
    } catch (err) {
      window['appData'] = {}
    }
    setData(window['appData'])
    */

    if (isSceneEmpty(app.scene)) {
      console.log(`tab.content(${id}): app scene is empty`)
    } else {
      console.log(`tab.content(${id}): app scene is present, going to LOADED`)
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

  const updateApp = (extra?: Partial<AppTab>) => {
    setOpenTabs((tabs) =>
      tabs.map((a) =>
        a.id === id
          ? {
              ...a,
              prompt,
              spec,
              scene,
              ...extra,
            }
          : a
      )
    )
  }

  const buildSpec = async (prompt = '') => {
    console.log(`tab.content(${id}): buildSpec`, { prompt })
    if (!prompt.length) {
      return
    }

    setIsLoadingAssets(true)
    setStartTimestamp(new Date().valueOf())
    setElapsedTimeMs(0)
    setStage('PLAN')

    let newSpec: Specification = getNewEmptySpec()

    try {
      const rawSpec = await imagineJSON<RawSpecification>(
        getPlannerPrompt(prompt, settings),
        {},
        '{',
        settings
      )
      if (!rawSpec || !Object.keys(rawSpec).length) {
        throw new Error(
          `tab.content(${id}): runPlanner: rawSpec is corrupted, aborting`
        )
      }
      newSpec = getFinalSpec(rawSpec)
      if (!newSpec || !Object.keys(newSpec).length) {
        throw new Error(
          `tab.content(${id}): runPlanner: newSpec is corrupted, aborting`
        )
      }
    } catch (exc) {
      console.error(`tab.content(${id}): runPlanner: PLAN failed`, exc)
      setIsLoadingAssets(false)
      setSpec(getNewEmptySpec())
      return
    }

    setSpec(newSpec)
    setIsLoadingAssets(false)
  }

  // run the builder - at this stage we are going to see something on the screen
  const buildScene = async (spec?: Specification) => {
    console.log(`tab.content(${id}): buildScene`)
    if (isSpecEmpty(spec)) {
      return
    }

    // ---- PHASE 2: BUILD ------
    setIsLoadingAssets(true)
    setStartTimestamp(new Date().valueOf())
    setElapsedTimeMs(0)
    setStage('BUILD')
    setTrials(trials + 1)

    let newScene: Scene = []

    try {
      newScene = await imagineScene(
        getBuilderPrompt(spec, apiDoc, settings),
        settings
      )
      if (!newScene) {
        throw new Error('failed to build the scene')
      }
    } catch (exc) {
      console.error(`tab.content(${id}): runPlanner: BUILD failed`, exc)
      setStage('LOADED')
      setIsLoadingAssets(false)
      return
    }

    setScene(newScene)

    // ---- PHASE 3: IMPROVE ------
    setStage('IMPROVE')
    setStartTimestamp(new Date().valueOf())
    setElapsedTimeMs(0)

    try {
      newScene = await imagineScene(
        getImproverPrompt(spec, scene, settings),
        settings
      )
      if (!newScene) {
        throw new Error('failed to improve the scene')
      }
    } catch (exc) {
      console.error(`tab.content(${id}): runPlanner: IMPROVE failed`, exc)
      setStage('LOADED')
      setIsLoadingAssets(false)
      return
    }

    setScene(newScene)
    setIsLoadingAssets(false)
    updateApp({ spec, scene })
  }

  useEffect(() => {
    console.log(
      `tab.content(${id}): prompt changed! seeing if we should PLAN..'`,
      { prompt }
    )

    if (isSpecEmpty(spec) && stage !== 'LOADED') {
      buildSpec(prompt)
    }
  }, [prompt])

  useEffect(() => {
    console.log(
      `tab.content(${id}): spec changed! seeing if we should BUILD..`,
      { spec }
    )
    if (isSceneEmpty(scene) && stage !== 'LOADED') {
      console.log(`tab.content(${id}): scene is empty! generating new one..`)
      buildScene(spec)
    }
  }, [spec])

  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      console.log('SCRIPT failure detected:', e)
      setScene([])
      if (settings.useAutoCherryPick && trials < 2) {
        console.log('auto cherry-pick enabled, so trying once again.. 💸')
        buildScene(spec)
      }
    }

    window.addEventListener('error', onError)

    return () => window.removeEventListener('error', onError)
  }, [spec, settings.useAutoCherryPick, trials])

  // replace all images alt with src
  useEffect(() => {
    const resolve = async () => {
      await resolveImages(settings)
      updateApp()
    }
    resolve()
  }, [scene])

  useInterval(
    () => {
      setElapsedTimeMs(new Date().valueOf() - startTimestamp)
    },
    // Delay in milliseconds or null to stop it
    isLoadingAssets ? 200 : null
  )

  return (
    <>
      <SceneRenderer>{scene}</SceneRenderer>
      <ModelProgressBar
        elapsedTimeMs={elapsedTimeMs}
        estimatedTimeSec={estimatedTimeSec}
        isLoading={isLoadingAssets}
        model={settings?.openAIModel}
        provider={settings?.coreVendor}
        stage={stage}
      />
    </>
  )
}

export default Content
