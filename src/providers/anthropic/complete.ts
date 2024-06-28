import { MessageParam } from '@anthropic-ai/sdk/resources/index.mjs';

import { CompleteFnParams } from "@/types"

import { getAnthropic, persisted } from './getAnthropic';

export async function complete({
  systemPrompt,
  userPrompt,
  nbMaxNewTokens,
  model,
  apiKey,
  settings,
  }: CompleteFnParams): Promise<string> {

  const anthropic = await getAnthropic(apiKey)

  const messages: MessageParam[] = [
    { role: "user", content: userPrompt },
  ]

  const res = await anthropic.messages.create({
    system: systemPrompt,

    messages,
    stream: false,
    model: model || persisted.model,
    temperature: settings.temperature,
    max_tokens: nbMaxNewTokens,
    top_p: 1,
  })

  return res.content[0]?.text || ""
}