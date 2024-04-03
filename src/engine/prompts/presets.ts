import { PromptSettings } from './types'

export const presets = {
  mocker: {
    temperature: 0.7,
    n: 1, // we try to stay optimistic.. we will query again if it fails
    bestOf: 1,
    gptLogitBias: {},
    codexLogitBias: {},
    frequencyPenalty: 0,
    presencePenalty: 0,
  } as PromptSettings,

  json: {
    temperature: 0.8,
    n: 1, // we try to stay optimistic.. we will query again if it fails
    bestOf: 1,
    gptLogitBias: {},
    codexLogitBias: {},
    frequencyPenalty: 0,
    presencePenalty: 0,
  } as PromptSettings,

  html: {
    temperature: 0.8,
    n: 1, // we try to stay optimistic.. we will query again if it fails
    bestOf: 1,
    gptLogitBias: {
      // lorem ipsum
      '75': -1,
      '29625': -1,
      '220': -1,
      '2419': -1,
      '388': -1,
    },
    codexLogitBias: {},
    frequencyPenalty: 0,
    presencePenalty: 0,
    stop: ['<script'],
  } as PromptSettings,

  text: {
    temperature: 0.8,
    n: 1, // we try to stay optimistic.. we will query again if it fails
    bestOf: 1,
    gptLogitBias: {
      // lorem ipsum
      '75': -1,
      '29625': -1,
      '220': -1,
      '2419': -1,
      '388': -1,
    },
    codexLogitBias: {},
    frequencyPenalty: 0,
    presencePenalty: 0,
  } as PromptSettings,

  script: {
    temperature: 0.7, // don't try to get to crazy here
    n: 1, // we try to stay optimistic.. we will query again if it fails
    bestOf: 1, // also try to be optimistic here..

    // ATTENTION! those are valid for GPT-3 only, not other models!!
    gptLogitBias: {
      // 1003 = //
      // code comments are bad because:
      // - they eat up token quotas
      // - they confuse GPT-3 itself, and it generate weird things like '// implementation goes here"
      // - users won't read them
      // - I don't need to modify the code neither, I just care about work / don't work
      '1003': -10, // note: we don't use the max (which is -100)

      // 15506 = ``
      // for some reason GPT-3 sometimes believe it is in a Markdown file
      // so we remove this extra garbage
      '15506': -10,
    },
    codexLogitBias: {},
    frequencyPenalty: 0,
    presencePenalty: 0,
    stop: ['</script>'],
  } as PromptSettings,
}
