import { Instrument } from 'reactronica'

import { type Component } from '../../../types'

export const instrument: Component = {
  component: Instrument,
  description: 'instrument config',
  allowedParents: 'mu',
  allowedChildren: null,
  params: {
    type: {
      description: '', // instrument type',
      values: ['synth'],
    },
  },
}
