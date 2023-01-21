import { Children, ReactNode } from 'react'
import { Content } from '../../../../components/core/Content'
import { toggle } from '../../../common'

import { type Component } from '../../../types'

const Page = ({ children }: { children?: ReactNode }): JSX.Element => {
  const nbItems = Children.toArray(children).length

  return (
    // if we have only one child then we wrap it into a nice content block
    // full screen applications can just omit to call Page
    nbItems === 1 ? <Content>{children}</Content> : <>{children}</>
  )
}

export const page: Component = {
  component: Page,
  doc: 'web page (for sites, landing pages, blogs..) with customizable colors',
  params: {
    fullscreen: {
      doc: 'fullscreen is recommanded to render games',
      values: toggle,
    },
    primary: {
      doc: 'primary color for normal text',
    },
    secondary: {
      doc: 'secondary color for non-important text',
    },
    fg: {
      doc: 'foreground color (for containers)',
    },
    bg: {
      doc: 'background color (for the whole page)',
    },
    accent: {
      doc: 'accentuation color',
    },
  },
}
