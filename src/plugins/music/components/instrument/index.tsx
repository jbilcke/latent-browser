import { Instrument } from 'reactronica'

import { type Component } from '../../../types'

export const instrument: Component = {
  component: Instrument,
  doc: 'instrument config',
  allowedParents: 'mu',
  allowedChildren: null,
  params: {
    type: {
      doc: '', // instrument type',
      values: ['synth'],
    },
  },
}
