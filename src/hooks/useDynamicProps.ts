// special hook that transform "raw" string props into "clean" props

import { evaluate } from '~/utils'

// it also handle watches the reference, to re-run again if something changed
export const useDynamicProps = <T>(props: Record<string, string>): T =>
  Object.entries(props || {}).reduce((acc, [key, value]) => {
    // TODO: work on useDynamicProps is currently on hold
    // because it is more complicated thant I though,
    // we can't simply re-render a child we need to re-render the whole template,
    // otherwise we may miss some lone eval blocks

    const { result, isDynamic } = evaluate(value)
    // what we wanted to do here was to implement variable watching
    // or polling or something, whenever the prop change
    // eg:
    // if isDynamic --> add to watch list
    // do a setState

    return {
      ...acc,
      [key]: result,
    }
  }, {} as T)
