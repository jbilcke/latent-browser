import { ReactNode } from 'react'
import { onlyText } from 'react-children-utilities'

import { type Component } from '../../../types'

export const cta: Component = {
  component: ({
    badge,
    children,
    aria,
  }: {
    badge?: ReactNode
    children?: ReactNode
    aria?: string
  }) => (
    <a
      href="#"
      className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
      role="alert"
    >
      <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">
        {onlyText(badge)}
      </span>{' '}
      <span className="text-sm font-medium">{onlyText(children)}</span>
      <svg
        className="ml-2 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </a>
  ),
  description: 'call to action',
  params: {
    badge: {
      description: 'badge ("new!", "exclusive" etc)',
    },
  },
}
