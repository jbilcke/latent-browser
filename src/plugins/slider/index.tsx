import { Children, ReactNode } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

import { Plugin } from '../types'
import { Image } from '../../components/core'

export const name = 'sl'

export const Slider = ({
  children,
  height,
}: {
  children?: ReactNode
  height?: string | number
}) => (
  <Splide
    options={{
      rewind: true,
      height,
      width: '100%',
      perPage: 1,
    }}
  >
    {
      (console.log('nbChildren:', Children.toArray(children).length),
      Children.map(Children.toArray(children), (child, index) => (
        <SplideSlide key={index}>
          {typeof child === 'string' ? <Image>{child}</Image> : child}
        </SplideSlide>
      )))
    }
  </Splide>
)

export const slider: Plugin = {
  name,
  examples: {},
  api: {
    slider: {
      component: Slider,
      description:
        'a carousel slider and image gallery, contains a list of images',
      params: {
        height: {
          description: 'in CSS unit',
        },
      },
    },
  },
}
