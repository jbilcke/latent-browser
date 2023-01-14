import { Fragment } from 'react'

import { components } from '../../../plugins'
import { getProps } from './getProps'

export const renderNode = (
  node: string | Record<string, any> = {}
): JSX.Element => {
  const key = Object.keys(node)[0]
  const value = node[key]
  let [comp, ...rest] = key.split('|')
  comp = comp.toLocaleLowerCase()
  if (typeof node === 'string') {
    ;[comp, ...rest] = node.toLocaleLowerCase().split('|')
  }

  if (!components[comp]) {
    console.log(`renderNode: component "${comp}" doesn't exist`, {
      key,
      comp,
      node,
      components,
    })
    return <></>
  }
  const { component, params } = components[comp]
  const Component = component as unknown as React.ComponentType<any>
  const props = getProps({ rest, params })

  return (
    <Component {...props}>
      {Array.isArray(value) ? renderTree(value) : value ? value : undefined}
    </Component>
  )
}

export const renderTree = (tree: Record<string, any>[] = []): JSX.Element => {
  return (
    <>
      {tree.map((node, i) => (
        <Fragment key={i}>{renderNode(node)}</Fragment>
      ))}
    </>
  )
}
