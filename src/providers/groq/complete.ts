import Groq from "groq-sdk"

import { CompleteFnParams } from "@/types"

import { getGroq, persisted } from "./getGroq"

export async function complete({
  systemPrompt,
  userPrompt,
  nbMaxNewTokens,
  model,
  apiKey,
  settings,
  }: CompleteFnParams): Promise<string> {

  const groq = await getGroq(apiKey)

  const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ]

  const res = await groq.chat.completions.create({
    messages,
    stream: false,
    model: model || persisted.model,
    user: 'default_user',
    temperature: settings.temperature,
    max_tokens: nbMaxNewTokens,
    n: settings.n,
    top_p: 1,
    frequency_penalty: settings.frequencyPenalty,
    presence_penalty: settings.presencePenalty,
    stop: settings.stop?.length ? settings.stop : undefined,
  })

  return res.choices[0].message.content || ""
}