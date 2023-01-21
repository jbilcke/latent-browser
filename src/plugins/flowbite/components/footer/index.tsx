import { Footer } from 'flowbite-react'

import { type Component } from '../../../types'

export const footer: Component = {
  component: Footer,
  description: 'footer',
  params: {},
}

export const footer_copyright: Component = {
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
}

export const footer_links: Component = {
  component: Footer.LinkGroup,
  description: 'list of links',
  params: {},
}

export const footer_link: Component = {
  component: Footer.Link,
  description: 'link to another page',
  params: {
    href: {
      description: 'internal link',
    },
    label: {},
  },
}
