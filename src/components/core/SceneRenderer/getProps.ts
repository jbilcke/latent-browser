import { parse } from 'yaml'

import { Param } from '../../../plugins/types'

// get the prop to apply to a component, using a schema (the params object)
export const getProps = ({
  rest,
  params,
}: {
  rest?: string[]
  params: Record<string, Param>
}): any => {
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
    // console.log('props:', props)
  }
  return props
}
