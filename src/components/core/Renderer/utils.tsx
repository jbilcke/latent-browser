import { Fragment } from 'react'
import { parse } from 'yaml'

import { components } from '../../../plugins'

/*
export const safeParse = (yaml: string) =>
  parse(
    yaml
      .split('\n')
      .map((line) => {
        const [key, ...chunks] = line.split(':')
        if (chunks.length < 1) {
          return line
        }
        // we need to sanitize lines that are like this:
        // - "pdf.p": This is the recipe for the invisibility potion:
        const lastChunk = chunks[chunks.length - 1]
        const isEscaped = lastChunk[lastChunk.length - 1] === '"'
        if (isEscaped) {
          return line
        }
        // we need to escape the value
        const value = JSON.stringify(chunks.join(':'))
        return [key, value].join(': ')
      })
      .join('\n')
  )
*/

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
  const { component, description, params } = components[comp]

  const Component = component as unknown as React.ComponentType<any>

  const props = (rest || []).reduce((acc, param) => {
    const [key, value] = param.split('=')

    // if the LLM imagined a fake param
    if (!params[key]) {
      // there are multiple things we could do such as using a semantically close param,
      // but for the moment let's just ignore!
      console.log(
        `renderNode: parameter "${key}" doesn't exist for component ${comp} (valid parameters are ${Object.keys(
          params
        )
          .map((p) => `"${p}"`)
          .join(', ')})`
      )
      return acc
    }

    // the actual prop field name maybe something longer, which is why we try to
    // use the real prop name first and if that's not possible, the key
    // (this approaches is simpler for us, because in most case we may not need to bother specifying different names)
    const prop = params[key].prop || key

    let parsed = value
    try {
      parsed = parse(parsed)
    } catch (err) {
      // nope.
    }

    return {
      ...acc,
      [prop]: parsed,
    }
  }, {})
  if (props && Object.keys(props).length) {
    console.log('props:', props)
  }

  if (Array.isArray(value)) {
    return <Component {...props}>{renderTree(value)}</Component>
  }
  if (value) {
    return <Component {...props}>{value}</Component>
  } else {
    return <Component {...props} />
  }
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
