import { LatentImage } from 'components/core'

import { type Component } from '../../../types'

export const image: Component = {
  component: LatentImage,
  doc: 'image or illustration described using detailed caption',
  params: {
    height: {
      // doc: 'CSS unit',
    },
    width: {
      // doc: 'CSS unit',
    },
  },
}
