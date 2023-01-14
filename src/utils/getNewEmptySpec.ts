import { type Specification } from '../engine/prompts'

export const getNewEmptySpec = (): Specification => ({
  layout: [],
  content: [],
  image: [],
  script: [],
  audio: [],
  style: [],
  summary: [],
})
