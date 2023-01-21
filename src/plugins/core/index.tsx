import { Plugin } from '../types'

import * as api from './components'

export const name = 'co'

/*
  when: {
    component: NoopComponent,
    description: 'event that could be observed',
    params: {
      then: {
        description: 'action to perform in that case',
      },
    },
  },
  agent: {
    component: NoopComponent,
    description: 'an autonomous agent',
  },
  */

export const core: Plugin = {
  name,
  examples: {},
  api,
}
