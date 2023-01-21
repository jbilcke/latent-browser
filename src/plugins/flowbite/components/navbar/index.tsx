import { Navbar } from 'flowbite-react'

import { type Component } from '../../../types'
import { toggle } from '../../../common'

export const navbar: Component = {
  component: Navbar,
  description: 'top navigation bar holding buttons',
  params: {
    fluid: {
      description: 'fluid layout',
      values: toggle,
    },
    rounded: {
      description: 'rounded corners',
      values: toggle,
    },
    /*
    children: {
      description: 'nav buttons',
      values: ['Button'],
    },
    */
  },
}
