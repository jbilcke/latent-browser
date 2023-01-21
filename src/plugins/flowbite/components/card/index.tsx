import { Card } from 'flowbite-react'

import { type Component } from '../../../types'
import { toggle } from '../../../common'

export const card: Component = {
  component: Card,
  doc: 'card component with sub-items',
  params: {
    horizontal: {
      doc: 'whether the layout is horizontal or not',
      values: toggle,
    },
    /*
    label: {
      doc: 'button label',
      values: ['some label'],
    },
    */
  },
}
