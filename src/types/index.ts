import { Scene, Specification } from '../engine/prompts/types'

export type AppType = 'search' | 'content' | 'favorites' | 'settings'

export interface App {
  // unique app ID (very important)
  id: string

  // app title (and tab title)
  title: string

  // subtitle (not very used right now)
  subtitle?: string

  // the mini-prompt visible in the top bar
  prompt?: string

  // specification used to generate the content
  spec?: Specification

  // scene tree
  scene?: Scene
}

export interface Tab {
  isActive: boolean

  isFavorite: boolean

  type: AppType

  // the tab is not a rehydrated app
  isNew: boolean
}

export type AppTab = App & Tab

export interface Link {
  title: string
  alt: string
}
export interface Settings {
  coreVendor: string
  coreSpeechToTextLanguage: string
  huggingFaceKey: string
  huggingFaceModel: string
  openAIKey: string
  openAIModel: string
  customPlannerPrompt: string
  customBuilderPrompt: string
  customImproverPrompt: string
  useAutoCherryPick: boolean
  useVendorCherryPick: boolean
  useMockData: boolean
}
