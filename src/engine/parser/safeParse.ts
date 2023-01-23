import { parse } from 'yaml'

import { ComponentTree } from '~/prompts'
import { safeYamlLineReturns } from '~/utils'

export const safeParse = (input?: string | ComponentTree): ComponentTree => {
  try {
    // empty inputs are okay, it means we are not initialized yet
    if (JSON.stringify(input) === '""') {
      return []
    }
    const newTree: ComponentTree =
      typeof input === 'string' ? parse(safeYamlLineReturns(input)) : input
    console.log('useComponentTree: newTree = ', newTree)
    if (!newTree || !Array.isArray(newTree) || newTree.length === 0) {
      // console.log('useComponentTree: TODO: try to recover the data but cutting off the dead portion')
      return []
    }
    return newTree
  } catch (err) {
    console.log('woops', err)
    return []
  }
}
