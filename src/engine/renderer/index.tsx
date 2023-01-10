import { Fragment, ReactNode, useEffect, useState } from 'react'
import { parse } from 'yaml'
import HTMLParser from 'html-to-json-parser'
import { kits, docs } from '../../components/kits'
import { useTheme } from '../../components/theme'
import { newLayoutPrompt } from '../prompts/layout'
import { Instructions } from '../prompts/types'

// scene graph
interface Scene {}

export const renderItem = (item: Record<string, any> = {}): JSX.Element => {
  console.log('item:', item)
  const key = Object.keys(item)[0]
  const value = item[key]
  const [comp, ...rest] = key.split('|')

  if (!kits[comp]) {
    console.log('could not find this component')
    return <></>
  }
  const { component, description, params } = kits[comp]
  const Component = component as unknown as React.ComponentType<any>

  const props = (rest || []).reduce((acc, param) => {
    const [key, value] = param.split('=')
    return {
      ...acc,
      [key]: value,
    }
  }, {})
  console.log('props:', props)

  if (Array.isArray(value)) {
    return <Component {...props}>{renderItems(value)}</Component>
  }
  if (value) {
    return <Component {...props}>{value}</Component>
  } else {
    return <Component {...props} />
  }
}

export const renderItems = (
  layout: Record<string, any>[] = []
): JSX.Element => {
  return (
    <>
      {layout.map((item, i) => (
        <Fragment key={i}>{renderItem(item)}</Fragment>
      ))}
    </>
  )
}
export const Renderer = (scene: Scene) => {
  const [layout, setLayout] = useState<Record<string, any>[]>([])
  const [theme, setTheme] = useTheme()

  // TODO:
  // also support Three.js scene graphs
  // https://r105.threejsfundamentals.org/threejs/lessons/threejs-scenegraph.html

  useEffect(() => {
    const fn = async () => {
      console.log('docs:', docs)

      const instructions: Instructions = {
        layout: ['many articles'],
        content: ['a blog about cats'],
        image: [],
        script: [],
        audio: [],
        style: [],
        summary: [],
      }
      const prompt = newLayoutPrompt(instructions, docs)
      console.log('prompt:', prompt)

      const skeletonString = `
- Theme|primaryText=#000000|secondaryText=#aaaaaa|foreground=#ffffff|background=#eeeeee|accent=#ff0000:
- Title|tag=h1: Cats and their stories
- Image|alt="An orange cat lounging on a blue blanket"|height="100px"|width="100px":
- Badge|color=purple: Cat Lovers
- Button|color=success: Read More
- Card|horizontal=false: 
  - title|tag=h2: Article 1
  - Image|alt="A tabby cat sitting in an armchair"|height="50px"|width="50px":
  - Badge|color=warning: Featured
  - Button|color=dark: Read More
- Card|horizontal=false: 
  - title|tag=h2: Article 2
  - Image|alt="A white cat lying on a windowsill"|height="50px"|width="50px":
  - Badge|color=indigo: Popular
  - Button|color=dark: Read More
- Card|horizontal=false: 
  - title|tag=h2: Article 3
  - Image|alt="A black cat perched on a fence"|height="50px"|width="50px":
  - Badge|color=gray: New
  - Button|color=dark: Read More`

      try {
        const candidate = parse(skeletonString)
        console.log('candidate:', candidate)
        if (!Array.isArray(candidate) || candidate.length === 0) {
          throw new Error('invalid layout!', candidate)
        }
        setLayout(candidate)
      } catch (err) {
        console.error('failed to parse layout:', err)
      }
    }
    fn()
  }, [])

  return (
    <div className="bg-primary-background h-screen w-screen">
      {renderItems(layout)}
    </div>
  )
}
