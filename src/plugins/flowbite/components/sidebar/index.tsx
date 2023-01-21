import { ReactNode } from 'react'
import { onlyText } from 'react-children-utilities'

import { Sidebar } from 'flowbite-react'

import { getIcon } from '../../../../components/icon/getIcon'

import { type Component } from '../../../types'

export const sidebar: Component = {
  component: ({ children }: { children?: ReactNode }) => (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>{children}</Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  ),
  doc: 'left sidebar',
  params: {},
}

export const sidebar_item: Component = {
  component: ({ children, icon }: { children?: ReactNode; icon?: string }) => (
    <Sidebar.ItemGroup>
      <Sidebar.Item href="#" icon={getIcon(icon)}>
        {onlyText(children)}
      </Sidebar.Item>
    </Sidebar.ItemGroup>
  ),
  doc: 'link or action button inside sidebar',
  params: {
    icon: {
      doc: 'icon name',
    },
    children: {
      doc: 'link label',
    },
  },
}
