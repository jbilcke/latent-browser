import { useEffect, useState } from 'react'
import { parse } from 'yaml'

import { ComponentTree } from 'engine/prompts'
import { safeYamlLineReturns } from 'utils'

export const useComponentTree = (input?: string | ComponentTree) => {
  const [tree, setTree] = useState<ComponentTree>([])

  // TODO:
  // also support Three.js scene graphs
  // https://r105.threejsfundamentals.org/threejs/lessons/threejs-scenegraph.html

  useEffect(() => {
    try {
      // empty inputs are okay, it means we are not initialized yet
      if (JSON.stringify(input) === '""') {
        return
      }
      const newTree: ComponentTree =
        typeof input === 'string' ? parse(safeYamlLineReturns(input)) : input
      console.log('useComponentTree: newTree = ', newTree)
      if (!Array.isArray(newTree) || newTree.length === 0) {
        console.log(
          'useComponentTree: TODO: try to recover the data but cutting off the dead portion'
        )
        throw new Error('invalid tree')
      }
      setTree(newTree)
    } catch (err) {
      console.error('useComponentTree: failed to parse tree:', err)
    }
  }, [input])

  return tree
}
