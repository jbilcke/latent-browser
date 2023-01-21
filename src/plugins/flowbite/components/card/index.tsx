import { Card } from 'flowbite-react'

import { type Component } from '../../../types'
import { toggle } from '../../../common'

export const card: Component = {
  component: Card,
  description: 'card component with sub-items',
  params: {
    horizontal: {
      description: 'whether the layout is horizontal or not',
      values: toggle,
    },
    /*
    label: {
      description: 'button label',
      values: ['some label'],
    },
    */
  },
}
