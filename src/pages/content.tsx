import { useEffect, useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'

import { imagineJSON, imagineTree, imagineTurboTree } from 'providers/openai'
import { resolveImages } from 'engine/resolvers/image'
import {
  getPlannerPrompt,
  getBuilderPrompt,
  getImproverPrompt,
  getFinalSpec,
  type RawSpecification,
  type ComponentTree,
  type Specification,
  presets,
} from 'engine/prompts'
import { ModelProgressBar, TreeRenderer } from 'components'
import {
  useInterval,
  useOpenTabs,
  useStoredApps,
  useSettings,
  useParam,
} from 'hooks'
import { getKeyForApps, getNewEmptySpec, isTreeEmpty, isSpecEmpty } from 'utils'
import { type AppTab } from 'types'
import { apiDoc } from 'plugins'
import { getTurboPrompt } from 'engine/prompts/turbo'

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
  const [tree, setTree] = useState<ComponentTree>()
  const [trials, setTrials] = useState<number>(0) // used to count attempts, but we may not need this anymore
  const [data, setData] = useState<Record<string, any>>({})

  useEffect(() => {
    console.log('primary use effect to init the app', {
      isLoading,
      id,
      openTabs,
    })
    if (!id || isLoading || !openTabs.length) {
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
      app,
    })

    setSpec(app.spec)
    setTree(app.tree)
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

    if (isTreeEmpty(app.tree)) {
      console.log(`tab.content(${id}): app tree is empty`)
    } else {
      console.log(`tab.content(${id}): app tree is present, going to LOADED`)
      setStage('LOADED')
    }
  }, [id, isLoading, getKeyForApps(openTabs)])

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
              tree,
              ...extra,
            }
          : a
      )
    )
  }

  const buildSpec = async (prompt = '') => {
    if (!prompt.length) {
      return
    }
    console.log(`tab.content(${id}): buildSpec`, { prompt })
    setIsLoadingAssets(true)
    setStartTimestamp(new Date().valueOf())
    setElapsedTimeMs(0)
    setStage('PLAN')

    let newSpec: Specification = getNewEmptySpec()

    // if PLAN step is disabled we resort to using a simple spec file
    if (!settings.usePlanStep) {
      setSpec({
        ...newSpec,
        summary: [prompt],
      })
      setIsLoadingAssets(false)
      return
    }

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
  const buildTree = async (spec?: Specification) => {
    if (isSpecEmpty(spec)) {
      return
    }
    console.log(`tab.content(${id}): buildTree`)

    // ---- PHASE 2: BUILD ------
    setIsLoadingAssets(true)
    setStartTimestamp(new Date().valueOf())
    setElapsedTimeMs(0)
    setStage('BUILD')
    setTrials(trials + 1)

    let newTreeRoot: ComponentTree = []
    let newTreeRootStr: string = ''

    try {
      let result
      if (settings.useTurboPrompt) {
        console.log('Turbo mode!')
        result = await imagineTurboTree(
          getTurboPrompt(spec, apiDoc, settings),
          presets.turbo,
          settings
        )
      } else {
        result = await imagineTree(
          getBuilderPrompt(spec, apiDoc, settings),
          presets.build,
          settings
        )
      }
      newTreeRoot = result.tree
      newTreeRootStr = result.treeStr
      if (!newTreeRoot || !newTreeRootStr) {
        throw new Error('failed to build the tree')
      }
    } catch (exc) {
      console.error(`tab.content(${id}): runPlanner: BUILD failed`, exc)
      setStage('LOADED')
      setIsLoadingAssets(false)
      return
    }

    setTree(newTreeRoot)

    // ---- OPTIONAL PHASE 3: IMPROVE ------

    // we can only perform the improve step if the stars are aligned
    if (!settings.useImproveStep || settings.useTurboPrompt) {
      setStage('LOADED')
      setIsLoadingAssets(false)
      updateApp({ spec, tree })
      return
    }

    setStage('IMPROVE')
    setStartTimestamp(new Date().valueOf())
    setElapsedTimeMs(0)

    try {
      const result = await imagineTree(
        getImproverPrompt(spec, newTreeRootStr, settings),
        presets.improve,
        settings
      )
      newTreeRoot = result.tree
      newTreeRootStr = result.treeStr
      if (!newTreeRoot || !newTreeRootStr) {
        throw new Error('failed to improve the tree')
      }
    } catch (exc) {
      console.error(`tab.content(${id}): runPlanner: IMPROVE failed`, exc)
      setStage('LOADED')
      setIsLoadingAssets(false)
      return
    }

    setTree(newTreeRoot)
    setStage('LOADED')
    setIsLoadingAssets(false)
    updateApp({ spec, tree })
  }

  useEffect(() => {
    if (id && prompt && isSpecEmpty(spec) && stage !== 'LOADED') {
      console.log(`tab.content(${id}): buildSpec(prompt)`, { prompt })
      buildSpec(prompt)
    }
  }, [id, prompt])

  useEffect(() => {
    if (id && !isSpecEmpty(spec) && isTreeEmpty(tree) && stage !== 'LOADED') {
      console.log(`tab.content(${id}): buildTree(spec)`, {
        spec,
      })
      buildTree(spec)
    }
  }, [id, spec])

  useEffect(() => {
    if (!id) {
      return
    }
    const onError = (e: ErrorEvent) => {
      console.log('SCRIPT failure detected:', e)
      setTree([])
      if (settings.useAutoCherryPick && trials < 2) {
        console.log('auto cherry-pick enabled, so trying once again.. 💸')
        buildTree(spec)
      }
    }

    window.addEventListener('error', onError)

    return () => window.removeEventListener('error', onError)
  }, [id, spec, settings.useAutoCherryPick, trials])

  // replace all images alt with src
  useEffect(() => {
    if (!id || isTreeEmpty(tree)) {
      return
    }
    const resolve = async () => {
      await resolveImages(settings)
      updateApp()
    }
    resolve()
  }, [id, tree])

  useInterval(
    () => {
      setElapsedTimeMs(new Date().valueOf() - startTimestamp)
    },
    // Delay in milliseconds or null to stop it
    isLoadingAssets ? 200 : null
  )

  return (
    <>
      <TreeRenderer>{tree}</TreeRenderer>
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
