import { useEffect, useState } from 'react'
import { parse } from 'yaml'

import { api, apiDoc } from '../../../plugins'
import { useTheme } from '../../theme'
import { scenePrompt } from '../../../engine/prompts/scene'
import { type Specification } from '../../../engine/prompts/types'

import { mockSceneString } from './mocks'
import { renderTree } from './utils'

export const Renderer = () => {
  const [tree, setTree] = useState<Record<string, any>[]>([])
  const [theme, setTheme] = useTheme()

  // TODO:
  // also support Three.js scene graphs
  // https://r105.threejsfundamentals.org/threejs/lessons/threejs-scenegraph.html

  useEffect(() => {
    const fn = async () => {
      console.log('api:', api)
      console.log('apiDoc:', apiDoc)

      const spec: Specification = {
        layout: ['many articles'],
        content: ['a blog about cats'],
        image: [],
        script: [],
        audio: [],
        style: [],
        summary: [],
      }
      const prompt = scenePrompt(spec, apiDoc)
      console.log('prompt:', prompt)

      // TODO remplace by the real string
      const sceneString = mockSceneString

      try {
        const candidate = parse(sceneString)
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
    }
    fn()
  }, [])

  return (
    <div className="bg-primary-background h-screen w-screen">
      {renderTree(tree)}
    </div>
  )
}
