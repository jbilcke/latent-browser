import { parse } from 'yaml'

import { Param } from '../../../plugins/types'

// get the prop to apply to a component, using a schema (the params object)
export const getProps = ({
  chunks,
  defaultChildren,
  params = {},
}: {
  chunks?: string[]
  defaultChildren?: any
  params?: Record<string, Param>
}): any => {
  const props = (chunks || []).reduce(
    (acc, param) => {
      if (!param) {
        return acc
      }
      let key = 'children'
      let value = param

      // we split using the equal symbol, however it might be used for something else
      // so we only keep the head (key) of the generated splitted array
      const arr = param.split('=')
      if (arr.length > 1) {
        key = arr.shift().toLocaleLowerCase().trim()
        value = arr.join('=')
      }

      // we finally restore our line returns!..
      value = value.replace(/ᐃ/g, '\n')

      const propDoc = params[key]

      // if the LLM imagined a fake param
      if (!propDoc) {
        // children have the right to be registered as prop even if it's not in the API spec!
        if (key == 'children') {
          if (acc[key]) {
            // something is wrong, children are defined twice!
            // let's use already defined children as priority,
            // because those will be the children from the tree structure,
            // so it is more interesting
            // alternatively, we could also concatenate them, but that will be weird
            console.log(
              'getProps: anomaly detected: children are defined twice!',
              {
                nodeLevelChildren: acc[key],
                subNodeLevelChildren: value,
              }
            )
            return acc
          }
        } else {
          // there are multiple things we could do such as using a semantically close param,
          // but for the moment let's just ignore!
          console.log(
            `getProps: parameter "${key}" doesn't exist (valid parameters are ${Object.keys(
              params
            )
              .map((p) => `"${p}"`)
              .join(', ')})`
          )
          return acc
        }
      }

      // the actual prop field name maybe something longer, which is why we try to
      // use the real prop name first and if that's not possible, the key
      // (this approaches is simpler for us, because in most case we may not need to bother specifying different names)
      const prop = propDoc?.prop || key

      let parsed = value
      try {
        // obviously this is super dangerous, but that's also the goal:
        // we need the LLM to program us
        parsed = eval(parsed)
      } catch (err) {
        // nope.
      }

      return {
        ...acc,
        [prop]: parsed,
      }
    },
    {
      children: defaultChildren,
    }
  )
  if (props && Object.keys(props).length) {
    console.log('props:', props)
  }
  return props
}
