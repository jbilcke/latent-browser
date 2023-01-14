import { ReactNode } from 'react'
import {
  Accordion,
  Badge,
  Card,
  Button,
  Navbar,
  Table,
  Footer,
} from 'flowbite-react'
import { type Plugin } from '../types'
import {
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
  toggle,
} from '../common'

// note: for theming see:
// https://flowbite-react.com/theme
// https://flowbite-react.com/

export const name = 'flowbite'

export const flowbite: Plugin = {
  name,
  examples: {},
  api: {
    accordion: {
      component: Accordion,
      description: 'accordion component',
      params: {},
    },
    'accordion.section': {
      component: ({
        title,
        children,
      }: {
        title: string
        children: ReactNode
      }) => (
        <Accordion.Panel>
          <Accordion.Title>{title}</Accordion.Title>
          <Accordion.Content>{children}</Accordion.Content>
        </Accordion.Panel>
      ),
      description: 'accordion title',
      params: {},
    },
    badge: {
      component: Badge,
      description: 'a badge component',
      params: {
        color: {
          description: 'badge color',
          values: [
            'info',
            'gray',
            'failure',
            'success',
            'warning',
            'indigo',
            'purple',
            'pink',
          ],
        },
        children: {
          description: 'badge label',
          values: ['some label'],
        },
      },
    },
    Button: {
      component: Button,
      description: 'an action button',
      params: {
        color: {
          description: 'button color',
          values: [
            'gray',
            'dark',
            'light',
            'success',
            'failure',
            'warning',
            'purple',
          ],
        },
        children: {
          description: 'button label',
          values: ['some label'],
        },
      },
    },
    card: {
      component: Card,
      description: 'a card component',
      params: {
        horizontal: {
          description: 'use horizontal layout or not',
          values: toggle,
        },
        children: {
          description: 'button label',
          values: ['some label'],
        },
      },
    },
    navbar: {
      component: Navbar,
      description: 'a top navigation bar',
      params: {
        fluid: {
          description: 'fluid layout',
          values: toggle,
        },
        rounded: {
          description: 'rounded corners',
          values: toggle,
        },
        children: {
          description: 'nav buttons',
          values: ['Button'],
        },
      },
    },
    /*
  'flowbite.Table': {
    component: Table,
    props: {
      children: 'table.cell'
    }
  }
  */
    footer: {
      component: Footer,
      description: 'footer',
      params: {},
    },
    'footer.copyright': {
      component: Footer.Copyright,
      description: 'copyright',
      params: {
        by: {
          description: 'author (eg. company)',
        },
        year: {
          description: 'copyright year',
        },
      },
    },
    'footer.links': {
      component: Footer.LinkGroup,
      description: 'list of footer links',
      params: {},
    },
    'footer.link': {
      component: Footer.Link,
      description: 'a link to another page',
      params: {
        href: {
          description: 'http link',
        },
        children: {
          description: 'a link label',
        },
      },
    },
  },
}
