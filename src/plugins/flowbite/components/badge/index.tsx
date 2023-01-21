import { Badge } from 'flowbite-react'

import { type Component } from '../../../types'

export const badge: Component = {
  component: Badge,
  description: 'badge, label or tag',
  params: {
    color: {
      description: '',
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
  },
}
