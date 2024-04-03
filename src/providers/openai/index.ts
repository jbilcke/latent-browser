import DOMPurify from 'dompurify'

// note: attention, GPT-3 encoder requires node:fs
// import * as gpt3encoder from 'gpt-3-encoder'
// const { encode, decode } = gpt3encoder

import { DalleImage } from './types'
import * as mocks from './mocks'
import { presets } from '../../engine/prompts/presets'
import { type PromptSettings } from '../../engine/prompts/types'
import { getOpenAI } from './getOpenAI'
import { complete } from './complete'

export const imagineString = async (
  prompt: string,
  settings: PromptSettings,
  model?: string,
  apiKey?: string,
  mockData?: boolean
): Promise<string> => {
  if (mockData) {
    return ''
  }
  const tokenHardLimit = 4096

  // https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
  // 1 token ~= 4 chars in English
  // 1 token ~= ¾ words
  // 100 tokens ~= 75 words
  // ideally we should have a precise function which try to count them, but until them let's use a rough approximation
  // the actual value for the prompt divider seems to be "2.8" but let's use 2.5, just to be safe
  const nbMaxNewTokens = Math.round(tokenHardLimit - prompt.length / 2.5)
  console.log('prompt length:', prompt.length)
  console.log(
    `requesting ${nbMaxNewTokens} of the ${tokenHardLimit} tokens availables`
  )

  return complete({
    systemPrompt: "",
    userPrompt: prompt,
    nbMaxNewTokens,
    model,
    apiKey,
    settings,
  })
}

export const imagineHTML = async (
  prompt: string,
  model?: string,
  apiKey?: string,
  mockData?: boolean
): Promise<string> => {
  // we put an empty <script> tag to try to prevent code generation
  prompt = `${prompt}<div`

  console.log('imagineHTML> prompt:', prompt)

  if (mockData) {
    return mocks.html
  }

  let raw = await imagineString(prompt, presets.html, model, apiKey)
  
  raw = raw
  .replaceAll("```html\n", "")
  .replaceAll("```html", "")

  // we remove everything after the last ```
  raw = raw.split('```')[0].trim()

  // const toStrip = `<div ${raw}`
  const toStrip = `${raw}`

  console.log('imagineHTML> raw:', raw)

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
  model: string,
  apiKey?: string,
  mockData?: boolean
): Promise<string> => {
  prompt = `${prompt}`

  console.log('imagineScript> prompt:', prompt)

  if (mockData) {
    return mocks.script
  }

  const output = await imagineString(
    prompt,
    presets.script,
    model,
    apiKey,
    mockData
  )

  /*
  This doesn't work, the browser refuses to add a script type=module
  let script = `<script type="module">
${
Object.values(libraries).map(({ prod }) => prod).join('\n')
}
window.appData = {};
${output}`.trim()
*/

  let script = `${output}`.trim()

  // we remove all the output markdown
  script = script
    .replaceAll('```html\n', '')
    .replaceAll('```html', '')
    .replaceAll('```javascript\n', '')
    .replaceAll('```javascript\n', '')
    .replaceAll('```javascript', '')

    // for some reason the LLM sometimes generates JS code with ‘ instead of '
    .replaceAll('‘', "'")
  
  // we remove everything after the last ```
  script = (script.split('```').shift() || "").trim()

  if (!script.startsWith('<script>')) {
    script = `<script>${script}`
  }
  // it is imperative that we ignore everything that might have been added after the main script
  script = (script.split('</script>').shift() || "").trim()

  // todo: should be done in a better way
  if (!script.endsWith('</script>')) {
    script = `${script}</script>`
  }

  return script
}

export const imagineJSON = async <T>(
  prompt: string,
  defaultValue: T,
  prefix: string,
  model?: string,
  apiKey?: string,
  mockData?: boolean
): Promise<T> => {
  console.log('imagineJSON> prompt:', prompt)

  if (mockData) {
    return mocks.json<T>(prefix)
  }

  let output = await imagineString(
    prompt,
    presets.json,
    model,
    apiKey,
    mockData
  )

  try {
    // we give a hint in our prompt by prefixing it, but we need to put it back in the output
    let raw = `${prefix}${output}`

    // remove common garbage added by the LLM
    raw = raw
      .replaceAll("[[```json", "")
      .replaceAll("[```json", "")
      .replaceAll("{{```json", "")
      .replaceAll("{```json", "")
      .replaceAll("```json\n", "")
      .replaceAll("```json", "")
      .replaceAll("[[```", "")
      .replaceAll("[```", "")
      .replaceAll("{{```", "")
      .replaceAll("{```", "")
      .replaceAll("{json", "")
      .replaceAll("[json", "")

     // we remove everything after the last ```
     raw = raw.split('```')[0].trim()
    
    // try to fix the LLM adding commas at the end of each line
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
  apiKey?: string,
  mockData?: boolean
): Promise<DalleImage> => {
  console.log('imagineImage', prompt)
  if (mockData) {
    return mocks.image
  }

  // DallE 2 only supports squares
  // Must be one of 256x256, 512x512, or 1024x1024.
  const size = 1024 // 1024
  const width = size
  const height = size
  const openai = await getOpenAI(apiKey)
  const response = await openai.images.generate({
    prompt,
    n: 1,
    size: `${width}x${height}`,
  })

  return {
    url: response.data[0]?.url || "",
    prompt,
    width,
    height,
  }
}
