import { Track } from 'reactronica'

import { type Component } from '../../../types'

export const track: Component = {
  component: Track,
  description: 'track with instruments',
  allowedParents: 'mu',
  allowedChildren: 'mu',
  params: {
    steps: {
      description: 'array of many musical notes like C3, E3, B2, E3 etc',
    },
  },
}
