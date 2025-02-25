
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

    // Here is a quote from Anthropic:
    //
    // It looks like you're running in a browser-like environment.
    // This is disabled by default, as it risks exposing your secret API credentials to attackers.
    //
    // If you understand the risks and have appropriate mitigations in place,
    // you can set the `dangerouslyAllowBrowser` option to `true`, e.g.,
    dangerouslyAllowBrowser: true
  })

  return anthropic
}