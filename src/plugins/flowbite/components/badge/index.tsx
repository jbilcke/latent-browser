import { Badge } from 'flowbite-react'

import { type Component } from '../../../types'

export const badge: Component = {
  component: Badge,
  doc: 'badge, label or tag',
  params: {
    color: {
      doc: '',
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
