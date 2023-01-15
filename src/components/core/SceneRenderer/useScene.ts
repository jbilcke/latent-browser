import { useEffect, useState } from 'react'
import { parse } from 'yaml'
import { Scene } from '../../../engine/prompts'

const cleanInput = (input: string) => {
  // the character ᐃ will be used to indicate line returns
  // we we replace all line returns with ᐃ
  // except the "normal" YAML line returns
  // (sorry, the substitution code is a bit complicate due to this..)
  const step1 = input.trim().replace(/\n/g, 'ᐃ')
  console.log('cleanInput: step1', step1)
  const step2 = step1.replace(/([:]?)ᐃ(\s*)-\s"/g, '$1\n$2- "')
  console.log('cleanInput: step2', step2)
  return step2
}

export const useScene = (input?: string | Scene) => {
  const [scene, setScene] = useState<Scene>([])

  // TODO:
  // also support Three.js scene graphs
  // https://r105.threejsfundamentals.org/threejs/lessons/threejs-scenegraph.html

  useEffect(() => {
    try {
      const newScene: Scene =
        typeof input === 'string' ? parse(cleanInput(input)) : input
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
