import { ReactNode } from 'react'
import { type Plugin } from '../types'

import { Dummy } from '../common'

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
    },
    h1: {
      component: ({ children }: { children: ReactNode }) => (
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:font-extrabold lg:text-6xl lg:leading-none dark:text-white lg:text-center lg:mb-7">
          {children}
        </h1>
      ),
      description:
        'a huge title (eg. for a big marketing pitch, or a product name, or a welcome message)',
    },
    h2: {
      component: ({ children }: { children: ReactNode }) => (
        <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-center dark:text-white md:text-4xl">
          {children}
        </h2>
      ),
      description: 'a big title (eg. for the titles of articles)',
    },
    h3: {
      component: ({ children }: { children: ReactNode }) => (
        <h3 className="self-center ml-3 text-2xl font-semibold text-gray-900 dark:text-white">
          {children}
        </h3>
      ),
      description: 'medium title (eg for an article section)',
    },
    h4: {
      component: ({ children }: { children: ReactNode }) => (
        <h4 className="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">
          {children}
        </h4>
      ),
      description: 'small title (eg. for a paragraph)',
    },
    p: {
      component: ({ children }: { children: ReactNode }) => (
        <p className="text-gray-900 font-extralight text-sm">{children}</p>
      ),
      description: 'paragraph',
    },
  },
}
