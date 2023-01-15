import { Fragment } from 'react'

import { components, globalIndex, scopedIndexes } from '../../../plugins'
import { getProps } from './getProps'

export const renderNode = (
  node: string | Record<string, any> = {},
  parent = ''
): JSX.Element => {
  const isString = typeof node === 'string'
  const chunks = (isString ? node : Object.keys(node)[0]).split('߷')
  const comp = chunks.shift().toLowerCase().trim()

  // the "scope" is always the first element
  // pdf.file
  // pdf.title
  //  ^
  const parentScope = parent.split('.')[0]

  /*
  console.log(`renderNode: DEBUG `, {
    comp,
    chunks,
    node,
    components,
    parentScope,
  })
  */

  let componentData = components[comp]
  if (!componentData) {
    console.log(`renderNode: component "${comp}" doesn't exist`, {
      comp,
      chunks,
      node,
      components,
    })
    // there seems to be a typo.. so let's look for an alternative!
    const match = globalIndex.search(comp)[0]
    if (!match?.item) {
      // yeah.. that didn't work either
      return undefined
    }
    console.log(`found a substitute for our unknown node ${comp}`, match)
    componentData = match.item
  }
  const { component, params, allowedParents } = componentData
  console.log('scope analysis:', {
    component,
    params,
    parentScope,
    allowedParents,
  })

  /*
  if (allowedParents && parentScope !== allowedParents) {
    console.log(
      `uh oh, it appears that node ${comp} cannot be used inside ${parentScope}`
    )
    // let's look for a *compliant* alternative!
    const scopeIndex = scopedIndexes[parentScope]
    if (!scopeIndex) {
      // well, we tried
      return undefined
    }
    const match = scopeIndex.search(comp)[0]
    if (!match?.item) {
      // yeah.. that didn't work either
      return undefined
    }

    console.log(
      `found a compliant substitute for our wrongly-scoped node ${comp}`,
      match
    )
    componentData = match.item
  }
  */

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
      {Array.isArray(children) ? renderTree(children, parent) : children}
    </Component>
  )
}

export const renderTree = (
  tree: Record<string, any>[] = [],
  parent = ''
): JSX.Element => {
  return (
    <>
      {tree.map((node, i) => (
        <Fragment key={i}>{renderNode(node)}</Fragment>
      ))}
    </>
  )
}
