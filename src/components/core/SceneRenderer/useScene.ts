import { useEffect, useState } from 'react'
import { parse } from 'yaml'
import { Scene } from '../../../engine/prompts'

export const useScene = (input?: string | Scene) => {
  const [scene, setScene] = useState<Scene>([])

  // TODO:
  // also support Three.js scene graphs
  // https://r105.threejsfundamentals.org/threejs/lessons/threejs-scenegraph.html

  useEffect(() => {
    try {
      const newScene: Scene =
        typeof input === 'string' ? parse(input.trim()) : input
      console.log('useScene: newScene = ', newScene)
      if (!Array.isArray(newScene) || newScene.length === 0) {
        console.log(
          'useScene: TODO: try to recover the data but cutting off the dead portion'
        )
        throw new Error('invalid scene')
      }
      setScene(newScene)
    } catch (err) {
      console.error('useScene: failed to parse scene:', err)
    }
  }, [input])

  return scene
}
