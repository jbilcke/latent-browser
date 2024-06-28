import { PromptSettings } from "@/engine/prompts/types"

export type LLMVendor =
  | 'ANTHROPIC'
  | 'OPENAI'
  | 'HUGGINGFACE'
  | 'GROQ'
  | 'REPLICATE'

export type AppType =
  | 'search'
  | 'content'
  | 'favorites'
  | 'settings'

export type TaskStage =
  | 'INIT'
  | 'TASKS'
  | 'LAYOUT'
  | 'CONTENT'
  | 'SCRIPT'
  | 'TEXT'
  | 'LOADED'
  | 'CRUD'
  
export type App = {
  // unique app ID (very important)
  id: string

  // app title (and tab title)
  title: string

  // subtitle (not very used right now)
  subtitle: string

  // the mini-prompt visible in the top bar
  prompt: string

  // specification used to generate the HTML and script
  tasks: Record<string, string>

  // source code of the HTML layout
  html: string

  // specification used to generate the page text
  text: Record<string, string>

  // source code of the script (app logic)
  script: string

  // persisted data
  data: Record<string, any>
}

export type Tab = {
  isActive: boolean

  isFavorite: boolean

  type: AppType

  // the tab is not a rehydrated app
  isNew: boolean
}

export type AppTab = App & Tab

export type Link = {
  title: string
  alt: string
}
export type Settings = Record<string, string | boolean> & {
  coreVendor: LLMVendor
  huggingFaceKey: string
  huggingFaceModel: string
  openAIKey: string
  openAIModel: string
  anthropicKey: string
  anthropicModel: string
  customTasksPrompt: string
  customHtmlPrompt: string
  customScriptPrompt: string
  useAutoCherryPick: boolean
  useMockData: boolean
}

export type CompleteFnParams = {
  systemPrompt: string,
  userPrompt: string,
  nbMaxNewTokens: number
  settings: PromptSettings
  model?: string
  apiKey?: string
}

export type CompleteFn = ({
  systemPrompt,
  userPrompt,
  nbMaxNewTokens,
  apiKey,
  }: CompleteFnParams) => Promise<string>
