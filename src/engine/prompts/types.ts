export interface ModulePath {
  minimal: string

  // basic import path used to produce basic code
  basic: string

  // fake import path used used to teach GPT-3 to use module imports
  prompt: string

  // full import path for production, with minified code
  prod: string
}

export interface CommonConfig {
  cssFramework: string
  design: string[]
  logic: string[]
  images: string[]
  direction: string[]
  params: string[]
  returns: string
  modules: string[]
}

export type RawSpecification = Record<string, string>
export type SpecCategory =
  | 'layout'
  | 'content'
  | 'image'
  | 'script'
  | 'audio'
  | 'style'
  | 'summary'
export type Specification = Record<SpecCategory, string[]>

export type Scene = Record<string, any>

// https://beta.openai.com/docs/api-reference/completions/create
// to improve the quality of output we want to forbid certain things
export interface PromptSettings {
  temperature: number
  n: number
  bestOf: number
  bestOfBoost: number

  // attention, gpt and codex tokens are different! https://beta.openai.com/tokenizer?view=bpe
  gptLogitBias: Record<string, number>
  codexLogitBias: Record<string, number>

  frequencyPenalty: number
  presencePenalty: number
  stop?: string[]
}

export interface SearchResult {
  title: string
  subtitle: string
  description: string
}
