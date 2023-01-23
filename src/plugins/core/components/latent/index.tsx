import { ReactNode } from 'react'
import { onlyText } from 'react-children-utilities'

import { type Component } from '~/plugins/types'
import { useLatentComponent } from '~/hooks'

// a component that will be rendered asynchronousy by the LLM
const Latent = ({ children }: { children?: ReactNode }): JSX.Element => {
  const component = useLatentComponent(onlyText(children))

  return <></>
}

export const latent: Component = {
  component: Latent,
  doc: 'component described using text',
}
