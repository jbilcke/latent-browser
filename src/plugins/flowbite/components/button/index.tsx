import { Button } from 'flowbite-react'

import { type Component } from '~/plugins/types'

export const button: Component = {
  component: (props: any) => (
    <Button
      {...{
        ...props,
        color: props.color === 'default' ? undefined : props.color,
      }}
    />
  ),
  doc: 'action button',
  params: {
    c: {
      prop: 'color',
      doc: 'button color. Default color is very common.',
      values: [
        'default',
        'gray',
        'dark',
        'light',
        'success',
        'failure',
        'warning',
        'purple',
      ],
    },
  },
}
