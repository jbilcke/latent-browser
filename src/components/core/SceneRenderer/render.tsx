import { Fragment } from 'react'

import { components } from '../../../plugins'
import { getProps } from './getProps'

export const renderNode = (
  node: string | Record<string, any> = {}
): JSX.Element => {
  const isString = typeof node === 'string'
  const chunks = (isString ? node : Object.keys(node)[0]).split('߷')
  const comp = chunks.shift().toLowerCase().trim()

  console.log(`renderNode: DEBUG `, {
    comp,
    chunks,
    node,
    components,
  })

  if (!components[comp]) {
    console.log(`renderNode: component "${comp}" doesn't exist`, {
      comp,
      chunks,
      node,
      components,
    })
    return <></>
  }
  const { component, params } = components[comp]
  console.log('something is wrong with params:', {
    component,
    params,
  })
  const Component = component as unknown as React.ComponentType<any>
  const { children, ...props } = getProps({
    chunks,
    params,
    defaultChildren: isString ? undefined : Object.values(node)[0],
  })
  console.log('<Component> ', {
    children,
    props,
    foo: isString ? undefined : Object.values(node)[0],
  })

  return (
    <Component {...props}>
      {Array.isArray(children) ? renderTree(children) : children}
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
