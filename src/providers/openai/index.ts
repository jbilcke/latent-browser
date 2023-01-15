import { Configuration, OpenAIApi } from 'openai'
import { parse } from 'yaml'

// note: attention, GPT-3 encoder requires node:fs
// import * as gpt3encoder from 'gpt-3-encoder'
// const { encode, decode } = gpt3encoder
export * from './types'
import { ImaginedImage } from './types'
import * as mocks from './mocks'
import { presets, Scene, type PromptSettings } from '../../engine/prompts'
import { getLatentBrowserName, isSceneEmpty } from '../../utils'
import { Settings } from '../../types'
import { parseTurbo } from '../../engine/parser'

// don't do this at home!
// if we deploy one day to the cloud, we MUST rewrite this..
export const credentials = {
  apiKey: '',
  model: '',
}

export const getOpenAI = async (apiKey?: string) => {
  // don't do this at home!
  // if we deploy one day to the cloud, we MUST rewrite this..
  credentials.apiKey = apiKey || credentials.apiKey

  const configuration = new Configuration({ apiKey: credentials.apiKey })
  const openai = new OpenAIApi(configuration)
  return openai
}

export const imagineString = async (
  prompt: string,
  preset: PromptSettings,
  settings?: Settings
): Promise<string> => {
  if (settings?.useMockData) {
    return ''
  }
  credentials.model = settings?.openAIModel || 'text-davinci-003'

  const tokenHardLimit = 4097

  // https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
  // 1 token ~= 4 chars in English
  // 1 token ~= ¾ words
  // 100 tokens ~= 75 words
  // ideally we should have a precise function which try to count them, but until them let's use a rough approximation
  // the actual value for the prompt divider seems to be "2.8" but let's use 2.5, just to be safe
  const maxTokens = Math.round(tokenHardLimit - prompt.length / 2.5)
  console.log('prompt length:', prompt.length)
  console.log(
    `requesting ${maxTokens} of the ${tokenHardLimit} tokens availables`
  )

  const openai = await getOpenAI(settings?.openAIKey)
  const response = await openai.createCompletion({
    model: credentials.model,
    prompt,
    user: getLatentBrowserName(),
    temperature: preset.temperature,
    max_tokens: maxTokens,
    n: preset.n,
    // top_p: 1,

    // "best_of must be greater than n"
    ...(settings?.useVendorCherryPick && preset.bestOfBoost > 1
      ? {
          best_of: preset.bestOfBoost,
        }
      : undefined),
    frequency_penalty: preset.frequencyPenalty,
    presence_penalty: preset.presencePenalty,
    logit_bias: preset.gptLogitBias,
    stop: preset.stop?.length ? preset.stop : undefined,
  })

  return response?.data?.choices?.[0]?.text?.trim() || ''
}

export const imagineJSON = async <T>(
  prompt: string,
  defaultValue: T,
  prefix: string,
  settings?: Settings
): Promise<T> => {
  console.log('imagineJSON> prompt:', prompt)

  if (settings?.useMockData) {
    return mocks.json<T>(prefix)
  }

  let output = await imagineString(prompt, presets.json, settings)

  try {
    // we give a hint in our prompt by prefixing it, but we need to put it back in the output
    const raw = `${prefix}${output}`

    // try to fix GPT-3 adding commas at the end of each line
    const regex = /\,(?!\s*?[\{\[\"\'\w])/g
    const input = raw.replace(regex, '')
    console.log(`input: ${input}`)

    const json = JSON.parse(input) as T

    // remove all trailing commas (`input` variable holds the erroneous JSON)
    if (json === null || typeof json === undefined) {
      throw new Error("couldn't parse JSON")
    }
    return json
  } catch (err) {
    console.log('error!', err)
    return defaultValue
  }
}

export const imagineScene = async (
  prompt: string,
  preset?: PromptSettings,
  settings?: Settings
): Promise<{
  scene: Scene
  sceneStr: string
}> => {
  console.log('imagineScene> prompt:', prompt)

  if (settings?.useMockData) {
    return {
      scene: mocks.scene,
      sceneStr: '',
    }
  }

  let rawSceneStr = await imagineString(prompt, preset, settings)

  console.log(`imagineScene> rawSceneStr:\n${rawSceneStr}`)

  try {
    // we give a hint in our prompt by prefixing it, but we need to put it back in the output
    let sceneStr = rawSceneStr.split('```')[0]

    // GPT hallucinate extra examples! we need to remove them too, by only keepin the first one
    sceneStr = sceneStr.split('\n#')[0]

    console.log(`imagineScene> sceneStr:\n${sceneStr}`)

    const scene = parse(sceneStr) as Scene

    // remove all trailing commas (`input` variable holds the erroneous JSON)
    if (isSceneEmpty(scene)) {
      throw new Error('scene is empty')
    }
    return { scene, sceneStr }
  } catch (err) {
    console.log('imagineScene> failed to parse scene', err)
    return { scene: [], sceneStr: '' }
  }
}

export const imagineTurboScene = async (
  prompt: string,
  preset?: PromptSettings,
  settings?: Settings
): Promise<{
  scene: Scene
  sceneStr: string
}> => {
  console.log('imagineTurboScene> prompt:', prompt)

  if (settings?.useMockData) {
    return {
      scene: mocks.scene,
      sceneStr: '',
    }
  }

  let rawSceneStr = await imagineString(prompt, preset, settings)

  console.log(`imagineTurboScene> rawSceneStr:\n${rawSceneStr}`)

  try {
    const sceneStr = rawSceneStr
    const scene = parseTurbo(sceneStr)

    // remove all trailing commas (`input` variable holds the erroneous JSON)
    if (isSceneEmpty(scene)) {
      throw new Error('scene is empty')
    }
    return { scene, sceneStr }
  } catch (err) {
    console.log('imagineTurboScene> failed to parse scene', err)
    return { scene: [], sceneStr: '' }
  }
}

export const imagineImage = async (
  prompt: string,
  settings?: Settings
): Promise<ImaginedImage> => {
  console.log('imagineImage', prompt)
  if (settings?.useMockData) {
    return mocks.image
  }

  // DallE 2 only supports squares
  // Must be one of 256x256, 512x512, or 1024x1024.
  const size = 1024 // 1024
  const width = size
  const height = size
  const openai = await getOpenAI(settings?.openAIKey)
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: `${width}x${height}`,
  })

  return {
    url: response.data.data[0].url,
    prompt,
    width,
    height,
  }
}
