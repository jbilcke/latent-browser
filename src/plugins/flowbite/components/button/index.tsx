import { Button } from 'flowbite-react'
import { type Component } from '../../../types'

export const button: Component = {
  component: Button,
  doc: 'an action button',
  params: {
    color: {
      doc: "button color. In the majority of case we don't want to use a color (it will use the default primary color)",
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
    label: {
      doc: 'button label',
      values: ['some label'],
    },
  },
}
