import { ReactNode } from 'react'
import { Page } from '@react-pdf/renderer'

import { type Component } from '../../../types'
import { styles } from '../styles'

export const page: Component = {
  component: ({ children }: { children?: ReactNode }) => (
    <Page size="A4" style={styles.body}>
      {children}
    </Page>
  ),
  description: 'a page of a PDF',
}
