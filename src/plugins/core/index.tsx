import { Plugin } from '../types'
import { Dummy } from '../common'
import { Image } from '../../components/core'
export const name = 'core'

export const core: Plugin = {
  name,
  examples: {},
  api: {
    eval: {
      component: Dummy,
      description: 'JS one-liner expression to evaluate',
    },
    image: {
      component: Image,
      description:
        'an image, with a caption to vividly describing an image or illustration',
      params: {
        height: {
          description: 'in CSS unit',
        },
        width: {
          description: 'in CSS unit',
        },
      },
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
