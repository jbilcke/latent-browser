import { ExoticComponent, FC, ReactNode } from 'react'

export interface APIComponentParam {
  description: string
  values?: Array<string | number | boolean>
}
export interface APIComponent {
  component?: ExoticComponent | FC
  description: string
  params?: Record<string, APIComponentParam>
}
export type APIKit = Record<string, APIComponent>
