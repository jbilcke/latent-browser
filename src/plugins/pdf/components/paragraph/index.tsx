import { ReactNode } from 'react'
import { Text } from '@react-pdf/renderer'
import { onlyText } from 'react-children-utilities'

import { type Component } from '../../../types'
import { styles } from '../styles'

export const p: Component = {
  component: ({
    children,
    color,
  }: {
    children?: ReactNode
    color?: string
  }) => (
    <Text style={[styles.p, { color: color || 'black' }]}>
      {onlyText(children)}
    </Text>
  ),
  doc: 'paragraph written in English',
  allowedParents: 'pf',
  allowedChildren: 'pf',
  params: {
    color: {},
  },
}
