import Groq from "groq-sdk"

// don't do this at home!
// if we deploy one day to the cloud, we MUST rewrite this..
export const persisted = {
  apiKey: '',
  model: '',
}

export const getGroq = async (apiKey?: string): Promise<Groq> => {
  // don't do this at home!
  // if we deploy one day to the cloud, we MUST rewrite this..
  persisted.apiKey = apiKey || persisted.apiKey

  if (!persisted.apiKey) { throw new Error(`missing API key, we can't call Groq`)}

  const groq = new Groq({
    apiKey: persisted.apiKey,
  })

  return groq
}