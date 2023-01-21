import { useEffect, useMemo, useState } from 'react'

import { useComponentTree } from './useComponentTree'
import { RenderTree } from './render'
import { ComponentTree } from 'engine/prompts'
import { useDebounce, useMouseDown, useMousePosition } from 'hooks'

const getFingerpint = (input?: any) => {
  try {
    return JSON.stringify(input)
  } catch (err) {
    return ''
  }
}

export const TreeRenderer = ({
  children,
}: {
  children?: string | ComponentTree
}) => {
  const tree = useComponentTree(children)
  const fingerprint = getFingerpint(tree)

  // warning: this is very costly, so I will have to memoize everything that has no
  // variable params
  // I will have to find a more efficient way to re-render the scene, especially the WebGL
  // elements
  const { x, y } = useMousePosition()
  const down = useMouseDown()
  // const forceRefresh = useDebounce(`${x} ${y} ${down}`, 50)
  const forceRefresh = false

  const content = useMemo(
    () => <RenderTree>{tree}</RenderTree>,
    [fingerprint, forceRefresh]
  )

  return (
    <div className="bg-primary-background h-screen w-screen flex overflow-hidden">
      {content}
    </div>
  )
}
