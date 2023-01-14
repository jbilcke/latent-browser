import { useEffect, useState } from 'react'
import { Scene } from '../components/core/Scene'
import { mockSceneString } from '../components/core/Scene/mocks'
import { scenePrompt } from '../engine/prompts/scene'
import { Specification } from '../engine/prompts/types'
import { apiDoc, components } from '../plugins'

// a search result page in the style of a famous search engine =)
function Test() {
  const [scene, setScene] = useState<string>('')
  useEffect(() => {
    console.log('Test:', { apiDoc, components })

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

    setScene(mockSceneString)
  }, [])

  // later we will put the colors into Tailwind, but right now let's just clone
  // some famous search engine colors
  return (
    <>
      <Scene>{scene}</Scene>
    </>
  )
}

export default Test
