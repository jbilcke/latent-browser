
import { ChatCompletionMessageParam } from "openai/resources/index.mjs"

import { CompleteFnParams } from "@/types"

import { getOpenAI, persisted } from "./getOpenAI"

export async function complete({
  systemPrompt,
  userPrompt,
  nbMaxNewTokens,
  model,
  apiKey,
  settings,
  }: CompleteFnParams): Promise<string> {

  // don't do this if you deploy the latent browser on a server!!!
  persisted.model = model || 'gpt-4-turbo-preview'

  const openai = await getOpenAI(apiKey)

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ]

  const res = await openai.chat.completions.create({
    messages,
    stream: false,
    model: model || persisted.model,
    user: 'default_user',
    temperature: settings.temperature,
    max_tokens: nbMaxNewTokens,
    n: settings.n,
    top_p: 1,

    // best_of: settings.bestOf, // <-- doesn't exist for chat

    frequency_penalty: settings.frequencyPenalty,
    presence_penalty: settings.presencePenalty,
    stop: settings.stop?.length ? settings.stop : undefined,
  })

  return res.choices[0].message.content || ""
}