import { ReactNode } from 'react'
import { type Plugin } from '../types'
import {
  Dummy,
  xs,
  sm,
  md,
  lg,
  info,
  success,
  error,
  warning,
  primary,
  secondary,
  accent,
  ghost,
} from '../common'
import { useImage } from '../../hooks/useImage'

export const H1 = ({ children }: { children: ReactNode }) => (
  <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:font-extrabold lg:text-6xl lg:leading-none dark:text-white lg:text-center lg:mb-7">
    {children}
  </h1>
)

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-center dark:text-white md:text-4xl">
    {children}
  </h2>
)

export const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="self-center ml-3 text-2xl font-semibold text-gray-900 dark:text-white">
    {children}
  </h3>
)

export const H4 = ({ children }: { children: ReactNode }) => (
  <h4 className="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">
    {children}
  </h4>
)

export const P = ({ children }: { children: ReactNode }) => (
  <p className="text-gray-900 font-extralight text-sm">{children}</p>
)

export const Image = ({
  alt,
  width,
  height,
}: {
  alt: string
  width: string
  height: string
}) => {
  const src = useImage({ alt, width, height })

  return src ? <img alt={alt} src={src} width={width} height={height} /> : null
}

export const name = 'ui'
export const ui: Plugin = {
  name,
  examples: {},
  api: {
    theme: {
      component: Dummy,
      description:
        'component to control the theme colors (HEX codes between #000000 and #ffffff)',
      params: {
        primaryText: {
          description: 'for main text',
        },
        secondaryText: {
          description: 'for non-important text',
        },
        foreground: {
          description: 'for containers',
        },
        background: {
          description: 'for page background',
        },
        accent: {
          description: 'for special items like badges',
        },
      },
    },
    image: {
      component: Image,
      description: 'an image container',
      params: {
        height: {
          description: 'image height in CSS unit',
        },
        width: {
          description: 'image width in CSS unit',
        },
        caption: {
          prop: 'children',
          description:
            'string caption to vividly describe an image or illustration, enough for someone to reproduce it again',
        },
      },
    },
    h1: {
      component: H1,
      description:
        'a huge title (eg. for a big marketing pitch, or a product name, or a welcome message)',
    },
    h2: {
      component: H2,
      description: 'a big title (eg. for the titles of articles)',
    },
    h3: {
      component: H3,
      description: 'a medium title (eg. for a section inside an article)',
    },
    h4: {
      component: H4,
      description: 'a small title (eg. for a paragraph title)',
    },
    p: {
      component: P,
      description: 'a paragraph written in English',
    },
  },
}
