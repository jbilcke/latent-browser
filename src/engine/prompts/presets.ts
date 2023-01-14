import { PromptSettings } from './types'

export const presets = {
  mocker: {
    temperature: 0.7,
    n: 1, // we try to stay optimistic.. we will query again if it fails
    bestOf: 1,
    bestOfBoost: 1,
    gptLogitBias: {},
    codexLogitBias: {},
    frequencyPenalty: 0,
    presencePenalty: 0,
  } as PromptSettings,

  json: {
    temperature: 0.8,
    n: 1, // we try to stay optimistic.. we will query again if it fails
    bestOf: 1,
    bestOfBoost: 1,
    gptLogitBias: {},
    codexLogitBias: {},
    frequencyPenalty: 0,
    presencePenalty: 0,
  } as PromptSettings,

  scene: {
    temperature: 0.7,
    n: 1, // we try to stay optimistic.. we will query again if it fails
    bestOf: 1,
    bestOfBoost: 1,
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
    stop: ['```'],
  } as PromptSettings,

  derivate: {
    temperature: 0.8,
    n: 1, // we try to stay optimistic.. we will query again if it fails
    bestOf: 1,
    bestOfBoost: 1,
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
    stop: ['```'],
  } as PromptSettings,
}
