import { useEffect } from 'react'

import { evaluate } from 'utils'

export const useEval = (src: string) => {
  useEffect(() => {
    evaluate(src)
  }, [src])
}
