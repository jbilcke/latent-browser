import { useEffect, useState } from 'react'

import { SceneRenderer } from '../components'
import { mockSceneString } from '../components/core/SceneRenderer/mocks'
import {
  getBuilderPrompt,
  newExamples,
  type Specification,
} from '../engine/prompts'
import { apiDoc, components } from '../plugins'

import { sample } from '../engine/parser/mock'
import { parseTurbo } from '../engine/parser'

// a search result page in the style of a famous search engine =)
function Test() {
  const [scene, setScene] = useState<string>('')
  useEffect(() => {
    /*
    console.log('newExamples:', newExamples)
    console.log('sample:', sample)
    console.log('result:', parseTurbo(sample))
    console.log('Test:', { apiDoc, components })
    */

    const spec: Specification = {
      layout: ['many articles'],
      content: ['a blog about cats'],
      image: [],
      script: [],
      audio: [],
      style: [],
      summary: [],
    }
    const builderPrompt = getBuilderPrompt(spec, apiDoc)
    console.log('builderPrompt:', builderPrompt)

    setScene(mockSceneString)
  }, [])

  // later we will put the colors into Tailwind, but right now let's just clone
  // some famous search engine colors
  return (
    <>
      <SceneRenderer>{scene}</SceneRenderer>
    </>
  )
}

export default Test
