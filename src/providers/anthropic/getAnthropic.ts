
import Anthropic from '@anthropic-ai/sdk';

// don't do this at home!
// if we deploy one day to the cloud, we MUST rewrite this..
export const persisted = {
  apiKey: '',
  model: '',
}

export const getAnthropic = async (apiKey?: string): Promise<Anthropic> => {
  // don't do this at home!
  // if we deploy one day to the cloud, we MUST rewrite this..
  persisted.apiKey = apiKey || persisted.apiKey

  if (!persisted.apiKey) { throw new Error(`missing API key, we can't call Anthropic`)}

  const anthropic = new Anthropic({
    apiKey: persisted.apiKey,
  })

  return anthropic
}