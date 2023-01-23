import { Footer } from 'flowbite-react'

import { type Component } from '../../../types'

export const footer: Component = {
  component: Footer,
  doc: 'footer',
  params: {},
}

export const footer_copyright: Component = {
  component: Footer.Copyright,
  doc: 'copyright',
  params: {
    b: {
      prop: 'by',
      doc: 'author (eg. company)',
    },
    y: {
      prop: 'year',
      doc: 'copyright year',
    },
  },
}

export const footer_links: Component = {
  component: Footer.LinkGroup,
  doc: 'list of links',
  params: {},
}

export const footer_link: Component = {
  component: Footer.Link,
  doc: 'link to another page',
  params: {
    h: {
      prop: 'href',
      doc: 'href link',
    },
  },
}
