import { Badge, Button, Navbar, Table } from 'daisyui'
import { APIKit } from '../types'
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

// https://github.com/daisyui/react-daisyui
export const daisyui: APIKit = {
  Badge: {
    component: Badge,
    description: 'a badge component',
    params: {
      color: {
        description: 'badge color',
        values: colors,
      },
      size: {
        description: 'badge size',
        values: sizes,
      },
      children: {
        description: 'badge label',
        values: ['some label'],
      },
    },
  },
  Button: {
    component: Button,
    description: 'an action button',
    params: {
      variant: {
        description: 'button style',
        values: ['outline', 'link'],
      },
      size: {
        description: 'button size',
        values: sizes,
      },
      children: {
        description: 'button label',
        values: ['some label'],
      },
    },
  },
  Navbar: {
    component: Navbar,
    description: 'a top navigation bar',
    params: {
      fluid: {
        description: 'fluid layout',
        values: toggle,
      },
      rounded: {
        description: 'rounded corners',
        values: toggle,
      },
      children: {
        description: 'nav buttons',
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
}
