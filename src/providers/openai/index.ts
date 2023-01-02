import { Configuration, OpenAIApi } from 'openai'
import DOMPurify from 'dompurify'

import {
  openAIApiToken,
  openAIModel,
  openAIUseMockData,
  openAIUser,
} from '../../config'
import { DalleImage } from './types'
import * as mocks from './mocks'

export const configuration = new Configuration({ apiKey: openAIApiToken })
export const openai = new OpenAIApi(configuration)

export const imagineString = async (
  prompt: string,
  model: string
): Promise<string> => {
  if (openAIUseMockData) {
    return ''
  }

  model = model || openAIModel

  const tokenHardLimit = 4097

  // https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
  // 1 token ~= 4 chars in English
  // 1 token ~= ¾ words
  // 100 tokens ~= 75 words
  // ideally we should have a precise function which try to count them, but until them let's use a rough approximation
  const maxTokens = Math.round(tokenHardLimit - prompt.length / 3.5)
  console.log('prompt length:', prompt.length)
  console.log(
    `requesting ${maxTokens} of the ${tokenHardLimit} tokens availables`
  )

  const response = await openai.createCompletion({
    model: model || openAIModel,
    prompt,
    user: openAIUser,
    temperature: 0.8,
    max_tokens: maxTokens,
    top_p: 1,
    // best_of: 2,
    frequency_penalty: 0,
    presence_penalty: 0,
    // stop: [stop],
  })

  return response?.data?.choices?.[0]?.text?.trim() || ''
}

export const imagineHTML = async (
  prompt: string,
  model?: string
): Promise<string> => {
  // we put an empty <script> tag to try to prevent code generation
  prompt = `${prompt}<script></script><div`

  console.log('imagineHTML> prompt:', prompt)

  if (openAIUseMockData) {
    return mocks.html
  }

  const raw = await imagineString(prompt, model)

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
    ALLOWED_ATTR: ['classname', 'alt', 'id', 'style', 'href'],
  })
  console.log('purified html:', purified)

  return purified
}

export const imagineScript = async (
  prompt: string,
  model?: string
): Promise<string> => {
  prompt = `${prompt}<script>`

  console.log('imagineScript> prompt:', prompt)

  if (openAIUseMockData) {
    return mocks.script
  }

  const output = await imagineString(prompt, model)

  // we give a hint in our prompt by prefixing it with <script> but we need to put it back in the output
  const script = `<script>${output}`

  return script
}

export const imagineJSON = async <T>(
  prompt: string,
  defaultValue: T,
  prefix: string,
  model?: string
): Promise<T> => {
  console.log('imagineJSON> prompt:', prompt)

  if (openAIUseMockData) {
    return mocks.json<T>(prefix)
  }

  let output = await imagineString(prompt, model)

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

export const imagineImage = async (prompt: string): Promise<DalleImage> => {
  console.log('imagineImage', prompt)
  if (openAIUseMockData) {
    return mocks.image
  }

  // DallE 2 only supports squares
  // Must be one of 256x256, 512x512, or 1024x1024.
  const size = 1024 // 1024
  const width = size
  const height = size
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
