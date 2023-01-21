import { type ReactNode } from 'react'
import { onlyText } from 'react-children-utilities'

import { type Component } from '../../../types'

// note: for theming see:
// https://flowbite-react.com/theme
// https://flowbite-react.com/

export const hero: Component = {
  component: ({ children }: { children: ReactNode }) => (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        {children}
      </div>
    </section>
  ),
  doc: 'section containing hero.cta, hero.title, hero.p, hero.buttons etc',
}
export const hero_title: Component = {
  component: ({ children }: { children?: ReactNode }) => (
    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      {onlyText(children)}
    </h1>
  ),
  doc: 'big catchy title used for marketing (landing page etc)',
}

export const hero_p: Component = {
  component: ({ children }: { children?: ReactNode }) => (
    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
      {onlyText(children)}
    </p>
  ),
  doc: 'paragraph containing some marketing pitch',
}

export const hero_buttons: Component = {
  component: ({ children }: { children?: ReactNode }) => (
    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
      {children}
    </div>
  ),
  doc: 'container for CTA buttons with sub items of type fl.button',
}
