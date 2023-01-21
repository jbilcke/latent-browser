const history: string[] = []

import { appContext } from './appContext'

export const runInContext = (ctx: any, src: string) => {
  return new Function(...Object.keys(ctx), src)(...Object.values(ctx))
}

export const evaluate = (src: string): { result: any; isDynamic: boolean } => {
  try {
    src = `${src}`
    // now it's time to interpret some JS, if any
    const matches = src.match(/⎝([^⎞]+)⎞/)
    const js = matches?.[1]
    if (!js) {
      /*
      console.log('not JS, skipping..', {
        src,
        matches,
        js,
      })
      */

      // we still try one last time to extract numbers and booleans

      const candidateNumber = Number(src)
      const isNumber = !isNaN(candidateNumber) && isFinite(candidateNumber)
      if (isNumber) {
        return { result: candidateNumber, isDynamic: false }
      }
      const candidateBoolean = src.toLowerCase()
      if (candidateBoolean === 'true') {
        return { result: true, isDynamic: false }
      } else if (candidateBoolean === 'false') {
        return { result: false, isDynamic: false }
      }
      return { result: src, isDynamic: false }
    }

    // console.log('evaluate: js=' + js)
    history.push(js)

    // const result = runInContext(tmpContext, js)
    const result = eval?.(js) // runInContext(tmpContext, js)
    // console.log('evaluate:result=' + JSON.stringify(result, null, 2))

    // we can't remove this console log, or else the application doesn't work anymore
    // console.log('evaluate: appContext=' + JSON.stringify(appContext, null, 2))
    JSON.stringify(appContext, null, 2)

    return {
      result: src.replace(/⎝([^⎞]+)⎞/, result),

      // we are only certified "dynamic" if we base ourselves on other variables
      // in other terms, to be dynamic the code must include $someVariable
      isDynamic: !!js.match(/\$[a-zA-Z_]+/),
    }
  } catch (exc) {
    console.log('failed to eval: ' + exc.toString())

    return {
      result: src.replace(/⎝([^⎞]+)⎞/, ''),
      isDynamic: false,
    }
  }
}
