import { ReactNode } from 'react'
import { Accordion } from 'flowbite-react'

import { type Component } from '../../../types'

export const accordion: Component = {
  component: Accordion,
  doc: 'accordion',
  params: {},
}

export const accordion_section: Component = {
  component: ({ title, children }: { title: string; children?: ReactNode }) => (
    <Accordion.Panel>
      <Accordion.Title>{title}</Accordion.Title>
      <Accordion.Content>{children}</Accordion.Content>
    </Accordion.Panel>
  ),
  doc: 'togglable show-hide section',
  params: {},
}
