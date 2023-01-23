import { useMemo } from 'react'

import { ComponentTree } from '~/prompts'
import { safeParse } from '~/engine/parser/safeParse'

const getFingerpint = (input?: any) => {
  try {
    return JSON.stringify(input)
  } catch (err) {
    return ''
  }
}

export const useComponentTree = (input?: string | ComponentTree) => {
  const fingerprint = getFingerpint(input)
  const tree = useMemo(() => safeParse(input), [input, fingerprint])
  return tree
}
