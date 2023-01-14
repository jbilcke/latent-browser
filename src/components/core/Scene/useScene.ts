import { useEffect, useState } from 'react'
import { parse } from 'yaml'

export const useScene = (scene = '') => {
  const [tree, setTree] = useState<Record<string, any>[]>([])

  // TODO:
  // also support Three.js scene graphs
  // https://r105.threejsfundamentals.org/threejs/lessons/threejs-scenegraph.html

  useEffect(() => {
    try {
      const candidate = parse(scene)
      console.log('candidate:', candidate)
      if (!Array.isArray(candidate) || candidate.length === 0) {
        console.log(
          'TODO: try to recover the data but cutting off the dead portion'
        )
        throw new Error('invalid scene', candidate)
      }
      setTree(candidate)
    } catch (err) {
      console.error('failed to parse layout:', err)
    }
  }, [scene])

  return tree
}
