import React from 'react'
import {
  cloneElement,
  Children,
  type ReactNode,
  type ReactElement,
} from 'react'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

import { type Component } from '~/plugins/types'
import { LatentImage } from '~/components'

const Slider = ({
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
    {Children.map(Children.toArray(children), (child, index) => (
      <SplideSlide key={index}>
        {typeof child === 'string' ? (
          <LatentImage className="object-cover h-full w-full">
            {child}
          </LatentImage>
        ) : (
          cloneElement(child as ReactElement, {
            className: 'object-cover h-full w-full',
          })
        )}
      </SplideSlide>
    ))}
  </Splide>
)

export const slider: Component = {
  component: Slider,
  doc: 'a carousel slider and image gallery, contains a list of images',
  params: {
    h: {
      prop: 'height',
      doc: 'height',
    },
  },
}
