import { Configuration, OpenAIApi } from 'openai'
import { openAIApiToken, openAIModel, openAIUser } from '../../config'

export const configuration = new Configuration({ apiKey: openAIApiToken })
export const openai = new OpenAIApi(configuration)

export const queryModel = async (prompt: string) => {
  const response = await openai.createCompletion({
    model: openAIModel,
    prompt,
    user: openAIUser,
    temperature: 0.7,
    max_tokens: 2500,
    top_p: 1,
    // best_of: 2,
    frequency_penalty: 0,
    presence_penalty: 0,
    // stop: [stop],
  })
  const res = response?.data?.choices?.[0]?.text?.trim() || ''

  // we don't care about hallucinated image src
  const html = res.replace(/src="[^"]+/g, 'src="')

  console.log(html)

  return html
}
