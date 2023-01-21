import { type ReactNode } from 'react'
import { type Component } from '../../../types'

export const h1 = {
  component: ({ children }: { children: ReactNode }) => (
    <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:font-extrabold lg:text-6xl lg:leading-none dark:text-white lg:text-center lg:mb-7">
      {children}
    </h1>
  ),
  doc: 'a huge title (eg. for a big marketing pitch, or a product name, or a welcome message)',
}

export const h2 = {
  component: ({ children }: { children: ReactNode }) => (
    <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-center dark:text-white md:text-4xl">
      {children}
    </h2>
  ),
  doc: 'a big title (eg. for the titles of articles)',
}

export const h3 = {
  component: ({ children }: { children: ReactNode }) => (
    <h3 className="self-center ml-3 text-2xl font-semibold text-gray-900 dark:text-white">
      {children}
    </h3>
  ),
  doc: 'medium title (eg for an article section)',
}

export const h4: Component = {
  component: ({ children }: { children: ReactNode }) => (
    <h4 className="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">
      {children}
    </h4>
  ),
  doc: 'small title (eg. for a paragraph)',
}
