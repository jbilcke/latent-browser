import { Navbar } from 'flowbite-react'

import { type Component } from '../../../types'
import { toggle } from '../../../common'

export const navbar: Component = {
  component: Navbar,
  doc: 'top navigation bar holding buttons',
  params: {
    f: {
      prop: 'fluid',
      doc: 'fluid layout',
      values: toggle,
    },
    r: {
      prop: 'rounded',
      doc: 'rounded corners',
      values: toggle,
    },
    /*
    children: {
      doc: 'nav buttons',
      values: ['Button'],
    },
    */
  },
}
