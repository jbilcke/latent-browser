import { type Component } from '../../../types'
import { NoopComponent } from '../../../common'

export const theme: Component = {
  component: NoopComponent,
  description:
    'component to control the theme colors (HEX codes between #000000 and #ffffff)',
  params: {
    primaryText: {
      description: 'main text',
    },
    secondaryText: {
      description: 'non-important text',
    },
    foreground: {
      description: 'containers',
    },
    background: {
      description: 'page background',
    },
    accent: {
      description: 'special items like badges',
    },
  },
}
