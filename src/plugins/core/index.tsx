import { Plugin } from '../types'
import { Dummy } from '../common'

export const name = 'core'

export const core: Plugin = {
  name,
  examples: {},
  api: {
    eval: {
      component: Dummy,
      description: 'small JS one-liner expression to evaluate',
    },
    /*
  when: {
    component: Dummy,
    description: 'event that could be observed',
    params: {
      then: {
        description: 'action to perform in that case',
      },
    },
  },
  agent: {
    component: Dummy,
    description: 'an autonomous agent',
  },
  */
  },
}
