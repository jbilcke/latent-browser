import { Param } from '~/plugins/types'
import { evaluate } from '~/utils'

// get the prop to apply to a component, using a schema (the params object)
export const getProps = ({
  rawProps,
  defaultChildren,
  params = {},
  name = '',
}: {
  rawProps?: string
  defaultChildren?: any
  params?: Record<string, Param>
  name?: string
}): { props: any; isDynamic: boolean } => {
  let isDynamic = false
  const props = (rawProps || '').split('߷').reduce(
    (acc, param) => {
      if (!param) {
        return acc
      }

      let key = 'children'
      let value = param

      // we split using the ≋ symbol, however it might be used for something else
      // so we only keep the head (key) of the generated splitted array
      const arr = param.split('≋')
      if (arr.length > 1) {
        key = arr.shift().toLocaleLowerCase().trim()
        value = arr.join('≋')
      }

      // we finally restore our line returns!..
      value = value.replace(/ᐃ/g, '\n')

      // now it's time to interpret some JS, if any
      const { result } = evaluate(value)

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
            `getProps: ${name} has no param "${key}" (but we found ${Object.keys(
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

      return {
        ...acc,
        [prop]: result,
      }
    },
    {
      children: defaultChildren,
    }
  )
  /*
  if (props && Object.keys(props).length) {
    console.log('props:', props)
  }
  */
  return { props, isDynamic }
}
