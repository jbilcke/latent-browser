import { useEffect, useState } from 'react'

import { Scene } from '../components'
import { mockSceneString } from '../components/core/SceneRenderer/mocks'
import { getBuilderPrompt, type Specification } from '../engine/prompts'
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
    const builderPrompt = getBuilderPrompt(spec, apiDoc)
    console.log('builderPrompt:', builderPrompt)

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
