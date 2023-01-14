import { Configuration, OpenAIApi } from 'openai'
import DOMPurify from 'dompurify'

// note: attention, GPT-3 encoder requires node:fs
// import * as gpt3encoder from 'gpt-3-encoder'
// const { encode, decode } = gpt3encoder
export * from './types'
import { ImaginedImage } from './types'
import * as mocks from './mocks'
import { libraries } from '../../engine/prompts/libraries'
import { presets } from '../../engine/prompts/presets'
import { type PromptSettings } from '../../engine/prompts/types'
import { getLatentBrowserName } from '../../utils/getLatentBrowserName'
import { Settings } from '../../types'

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

export const imagineHTML = async (
  prompt: string,
  settings?: Settings
): Promise<string> => {
  // we put an empty <script> tag to try to prevent code generation
  prompt = `${prompt}<div`

  console.log('imagineHTML> prompt:', prompt)

  if (settings?.useMockData) {
    return mocks.html
  }

  const raw = await imagineString(prompt, presets.html, settings)

  console.log('imagineHTML> raw:', raw)

  const toStrip = `<div ${raw}`

  // we don't care about hallucinated image src
  const toPurify = toStrip.replace(/src="[^"]+/g, 'src="')

  // we give a hint in our prompt by prefixing it with <div but we need to put it back in the output
  const purified = DOMPurify.sanitize(toPurify, {
    USE_PROFILES: {
      html: true,
      mathMl: true,
      svg: true,
    },
    ALLOWED_ATTR: [
      'classname',
      'alt',
      'id',
      'style',
      'href',
      'width',
      'height',
    ],
  })
  console.log('purified html:', purified)

  return purified
}

export const imagineScript = async (
  prompt: string,
  settings?: Settings
): Promise<string> => {
  prompt = `${prompt}`

  console.log('imagineScript> prompt:', prompt)

  if (settings.useMockData) {
    return mocks.script
  }

  const output = await imagineString(prompt, presets.script, settings)

  /*
  This doesn't work, the browser refuses to add a script type=module
  let script = `<script type="module">
${
Object.values(libraries).map(({ prod }) => prod).join('\n')
}
window.appData = {};
${output}`.trim()
*/
  let script = `<script>
window.appData = {};
var app = window.appData;
${output}`.trim()
  // for some reason GPT-3 sometimes generates JS code with ‘ instead of '
  script = script.replace('‘', "'")

  // for some reason GPT-3 sometimes believe it is in a Markdown file
  // so we remove this extra garbage
  script = script.split('```')[0].trim()

  // it is imperative that we ignore everything that might have been added after the main script
  script = script.split('</script>').shift().trim()

  // todo: should be done in a better way
  if (!script.endsWith('</script>')) {
    script += '</script>'
  }

  return script
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
