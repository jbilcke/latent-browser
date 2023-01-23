import { ReactNode } from 'react'
import { Text } from '@react-pdf/renderer'
import { onlyText } from 'react-children-utilities'

import { type Component } from '../../../types'
import { styles } from '../styles'

export const author: Component = {
  component: ({
    children,
    color,
  }: {
    children?: ReactNode
    color?: string
  }) => (
    <Text style={[styles.author, { color: color || 'black' }]}>
      {onlyText(children)}
    </Text>
  ),
  doc: 'author of the book',
  allowedParents: 'pf',
  allowedChildren: 'pf',
  params: {
    c: {
      doc: 'color',
      prop: 'color',
    },
  },
}
