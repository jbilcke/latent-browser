import { type Specification } from '~/prompts'

export const getNewEmptySpec = (): Specification => ({
  layout: [],
  content: [],
  image: [],
  script: [],
  audio: [],
  style: [],
  summary: [],
})
