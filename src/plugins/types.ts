import { ExoticComponent, FC, ReactNode } from 'react'

export interface Param {
  description: string

  // sometimes we want to give to the LLM a simplified name,
  // so we use "prop" to define the actual component prop field key
  prop?: string

  // possible values (aka "types")
  values?: Array<string | number | boolean>
}
export interface Component {
  component?: ExoticComponent | FC
  description: string
  params?: Record<string, Param>
}
export type API = Record<string, Component>

export type Example = Record<string, Record<string, any>>
export type Examples = Record<string, Example>

export interface Plugin {
  name: string
  examples: Examples
  api: API
}

export type Plugins = Record<string, Plugin>
