import { Fragment, ReactNode, memo } from 'react'

import { components, globalIndex, scopedIndexes } from '~/plugins'
import { getProps } from './getProps'

export const RenderNode = ({
  children: node = {},
  parent = '',
}: {
  children?: string | Record<string, any>
  parent?: string
}): JSX.Element => {
  const isString = typeof node === 'string'
  const chunks = (isString ? node : Object.keys(node)[0]).split('⎛')

  // length 1 means we only have text as children, which is not an ivalid use case
  // eg:
  // - "pf.pdf":
  //   - "The Test” <--- this
  if (chunks.length === 1) {
    const child = chunks[0].split('߷').pop()

    return child ? <>child</> : undefined
  }

  // sanity check: if the length was not 1, as is not 2 either
  // then it means the LLM is going haywire
  if (chunks.length !== 2) {
    // the canary died :/
    console.log('error when trying to split node with ⎛: ' + node)
    return undefined
  }
  const [rawComp, rawProps] = chunks

  const comp = rawComp.toLowerCase().trim()

  if (!comp) {
    // we have a weird case, like this:
    // - "⎛foobar"
    // this is considered invalid
    console.log('invalid case: ' + node)
    return undefined
  }

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
  /*
  console.log('scope analysis:', {
    component,
    params,
    parentScope,
    allowedParents,
  })
  */

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
  const res = getProps({
    rawProps,
    params,
    defaultChildren: isString ? undefined : Object.values(node)[0],
    name: comp,
  })
  const isDynamic = res.isDynamic
  const { children, ...props } = res.props
  /*
  console.log('<Component> ', {
    children,
    props,
    foo: isString ? undefined : Object.values(node)[0],
  })
  */

  const returned = (
    <Component {...props}>
      {Array.isArray(children) ? renderTree({ parent, children }) : children}
    </Component>
  )

  return returned
}

// note: the renderTree must be a normal function and not a React component
// that is because some components such as the Slider are iterating over children
// but if we use a <RenderTree> then the slider will have only 1 child, and the Slider will not work anymore
export const renderTree = ({
  children = [],
  parent = '',
}: {
  children?: Record<string, any>[]
  parent?: string
}): ReactNode => {
  return children.map((node, i) => (
    <RenderNode parent={parent} key={i}>
      {node}
    </RenderNode>
  ))
}
