import { ReactNode } from 'react'
import { Text } from '@react-pdf/renderer'
import { onlyText } from 'react-children-utilities'

import { type Component } from '../../../types'
import { styles } from '../styles'

export const h1: Component = {
  component: ({
    children,
    color,
  }: {
    children?: ReactNode
    color?: string
  }) => (
    <Text style={[styles.h1, { color: color || 'black' }]}>
      {onlyText(children)}
    </Text>
  ),
  doc: 'book title',
  allowedParents: 'pf',
  allowedChildren: 'pf',
  params: {
    c: {
      prop: 'color',
      doc: 'color',
    },
  },
}

export const h2: Component = {
  component: ({
    children,
    color,
  }: {
    children?: ReactNode
    color?: string
  }) => (
    <Text style={[styles.h2, { color: color || 'black' }]}>
      {onlyText(children)}
    </Text>
  ),
  doc: 'chapter title',
  allowedParents: 'pf',
  allowedChildren: 'pf',
  params: {
    color: {},
  },
}

export const h3: Component = {
  component: ({
    children,
    color,
  }: {
    children?: ReactNode
    color?: string
  }) => (
    <Text style={[styles.h3, { color: color || 'black' }]}>
      {onlyText(children)}
    </Text>
  ),
  doc: 'paragraph title',
  allowedParents: 'pf',
  allowedChildren: 'pf',
  params: {
    color: {},
  },
}
