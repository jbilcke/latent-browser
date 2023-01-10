import { Badge, Card, Button, Navbar, Table } from 'flowbite-react'
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

// https://flowbite-react.com/
export const flowbite: APIKit = {
  Badge: {
    component: Badge,
    description: 'a badge component',
    params: {
      color: {
        description: 'badge color',
        values: [
          'info',
          'gray',
          'failure',
          'success',
          'warning',
          'indigo',
          'purple',
          'pink',
        ],
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
      color: {
        description: 'button color',
        values: [
          'gray',
          'dark',
          'light',
          'success',
          'failure',
          'warning',
          'purple',
        ],
      },
      children: {
        description: 'button label',
        values: ['some label'],
      },
    },
  },
  Card: {
    component: Card,
    description: 'a card component',
    params: {
      horizontal: {
        description: 'use horizontal layout or not',
        values: toggle,
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
        values: ['Button'],
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
