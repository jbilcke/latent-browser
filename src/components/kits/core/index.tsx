import { ReactNode } from 'react'
import { Badge, Button, Navbar, Table } from 'daisyui'
import { APIKit } from '../types'
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

export const Title = ({ children }: { children: ReactNode }) => (
  <h3>{children}</h3>
)

export const P = ({ children }: { children: ReactNode }) => <p>{children}</p>

export const Image = ({
  alt,
  width,
  height,
}: {
  alt: string
  width: string
  height: string
}) => <img alt={alt} width={width} height={height} />

export const core: APIKit = {
  Theme: {
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
  Image: {
    component: Image,
    description: 'an image container',
    params: {
      alt: {
        description:
          'vivid caption description of an image or illustration, enough for someone to reproduce it again',
      },
      height: {
        description: 'image height in CSS unit',
      },
      width: {
        description: 'image width in CSS unit',
      },
    },
  },
  Title: {
    component: Title,
    description: 'a title',
    params: {
      tag: {
        description: 'heading type',
        values: ['h1', 'h2', 'h3', 'h4'],
      },
    },
  },
  P: {
    component: P,
    description: 'a paragraph',
  },
}
