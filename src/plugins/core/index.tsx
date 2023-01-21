import { Plugin } from '../types'

import * as api from './components'

export const name = 'co'

/*
  when: {
    component: NoopComponent,
    doc: 'event that could be observed',
    params: {
      then: {
        doc: 'action to perform in that case',
      },
    },
  },
  agent: {
    component: NoopComponent,
    doc: 'an autonomous agent',
  },
  */

export const core: Plugin = {
  name,
  examples: {},
  api,
}
