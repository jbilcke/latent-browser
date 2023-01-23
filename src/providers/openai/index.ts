import { Configuration, OpenAIApi } from 'openai'

// note: attention, GPT-3 encoder requires node:fs
// import * as gpt3encoder from 'gpt-3-encoder'
// const { encode, decode } = gpt3encoder
export * from './types'
import { ImaginedImage } from './types'
import * as mocks from './mocks'
import { type ComponentTree, presets, type PromptSettings } from '~/prompts'
import { getLatentBrowserName, isTreeEmpty } from '~/utils'
import { Settings } from '~/types'
import { mockTreeString } from '~/components/core/TreeRenderer/mocks'
import { safeParse } from '~/engine/parser/safeParse'

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
  if (settings?.useMockData || !settings?.openAIModel || !settings?.openAIKey) {
    return ''
  }
  credentials.model = settings?.openAIModel || 'text-davinci-003'

  const tokenHardLimit = 4097

  // https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
  // 1 token ~= 4 chars in English
  // 1 token ~= ¾ words
  // 100 tokens ~= 75 words
  // ideally we should have a precise function which try to count them, but until them let's use a rough approximation
  // the actual value for the prompt divider seems to be "2.8" but let's use 2.4, just to be safe
  const maxTokens = Math.round(tokenHardLimit - prompt.length / 2.4)
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

  if (settings?.useMockData || !settings?.openAIModel || !settings?.openAIKey) {
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

export const imagineTree = async (
  prompt: string,
  preset?: PromptSettings,
  settings?: Settings
): Promise<{
  tree: ComponentTree
  treeStr: string
}> => {
  console.log('imagineTree> prompt:', prompt)

  if (settings?.useMockData) {
    console.log('returning a mock tree..')

    try {
      const treeStr = mockTreeString
      const tree = safeParse(treeStr)

      return {
        tree,
        treeStr,
      }
    } catch (exc) {
      console.log('failed to return the mock.. strange! ' + exc)
      return { tree: [], treeStr: '' }
    }
  }

  if (!settings?.openAIModel || !settings?.openAIKey) {
    console.log('no model or api key configured')
    return { tree: [], treeStr: '' }
  }

  let rawTreeStr = await imagineString(prompt, preset, settings)

  console.log(`imagineTree> rawTreeStr:\n${rawTreeStr}`)

  try {
    // we give a hint in our prompt by prefixing it, but we need to put it back in the output
    let treeStr = rawTreeStr.split('```')[0]

    // GPT hallucinate extra examples! we need to remove them too, by only keepin the first one
    treeStr = treeStr.split('\n#')[0]

    console.log(`imagineTree> treeStr:\n${treeStr}`)

    const tree = safeParse(treeStr)

    // remove all trailing commas (`input` variable holds the erroneous JSON)
    if (isTreeEmpty(tree)) {
      throw new Error('tree is empty')
    }
    return { tree, treeStr }
  } catch (err) {
    console.log('imagineTree> failed to parse tree', err)
    return { tree: [], treeStr: '' }
  }
}

export const imagineImage = async (
  prompt: string,
  settings?: Settings
): Promise<ImaginedImage> => {
  console.log('imagineImage', prompt)
  if (settings?.useMockImages || !settings?.openAIKey) {
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
