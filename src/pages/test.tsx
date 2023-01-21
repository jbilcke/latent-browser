import { useEffect, useState } from 'react'

import { ComponentTreeRenderer } from '../components'
import { mockTreeString } from '../components/core/ComponentTreeRenderer/mocks'
import { getBuilderPrompt, type Specification } from '../engine/prompts'
import { apiDoc, components } from '../plugins'

import { sample } from '../engine/parser/mock'
import { parseTurbo } from '../engine/parser'

// a search result page in the style of a famous search engine =)
function Test() {
  const [tree, setTree] = useState<string>('')
  useEffect(() => {
    /*
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

    setTree(mockTreeString)
  }, [])

  // later we will put the colors into Tailwind, but right now let's just clone
  // some famous search engine colors
  return (
    <>
      <ComponentTreeRenderer>{tree}</ComponentTreeRenderer>
    </>
  )
}

export default Test
