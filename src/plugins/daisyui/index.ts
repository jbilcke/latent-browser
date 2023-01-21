import { Badge, Button, Navbar, Table } from 'daisyui'
import { type Plugin } from '../types'
import {
  xs,
  sm,
  md,
  lg,
  info,
  success,
  error,
  warning,
  primary,
  secondary,
  accent,
  ghost,
  toggle,
} from '../common'

// presets specific to Daisy-UI
const sizes = [xs, sm, md, lg]
const colors = [
  info,
  success,
  error,
  warning,
  primary,
  secondary,
  accent,
  ghost,
]

export const name = 'da'

// https://github.com/daisyui/react-daisyui
export const daisyui: Plugin = {
  name,
  examples: {},
  api: {
    Badge: {
      component: Badge,
      doc: 'a badge component',
      params: {
        color: {
          doc: 'badge color',
          values: colors,
        },
        size: {
          doc: 'badge size',
          values: sizes,
        },
        children: {
          doc: 'badge label',
          values: ['some label'],
        },
      },
    },
    Button: {
      component: Button,
      doc: 'an action button',
      params: {
        variant: {
          doc: 'button style',
          values: ['outline', 'link'],
        },
        size: {
          doc: 'button size',
          values: sizes,
        },
        children: {
          doc: 'button label',
          values: ['some label'],
        },
      },
    },
    Navbar: {
      component: Navbar,
      doc: 'a top navigation bar',
      params: {
        fluid: {
          doc: 'fluid layout',
          values: toggle,
        },
        rounded: {
          doc: 'rounded corners',
          values: toggle,
        },
        children: {
          doc: 'nav buttons',
          values: ['some label'],
        },
      },
    },
    /*
  'flowbite.Table': {
    component: Table,
    props: {
      children: 'table.cell'
    }
  }
  */
  },
}
