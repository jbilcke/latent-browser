import { ReactNode } from 'react'
import { onlyText } from 'react-children-utilities'

import { type Component } from 'plugins/types'
import { useEval } from 'hooks'

const JS = ({ children }: { children?: ReactNode }): JSX.Element => {
  useEval(onlyText(children))

  return undefined
}

export const js: Component = {
  component: JS,
  doc: 'JS one-liner expression passed to eval()',
}
