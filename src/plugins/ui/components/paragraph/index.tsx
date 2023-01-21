import { type ReactNode } from 'react'
import { type Component } from '../../../types'

export const p: Component = {
  component: ({ children }: { children: ReactNode }) => (
    <p className="text-gray-900 font-extralight text-sm">{children}</p>
  ),
  description: 'paragraph',
}
