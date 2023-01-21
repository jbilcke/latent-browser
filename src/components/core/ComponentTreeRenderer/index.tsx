import { memo } from 'react'
// import { useTheme } from '../../theme'
import { useComponentTree } from './useComponentTree'
import { renderTree } from './render'
import { ComponentTree } from '../../../engine/prompts'

export const Renderer = ({
  children,
}: {
  children?: string | ComponentTree
}) => {
  const tree = useComponentTree(children)
  // const [theme, setTheme] = useTheme()

  return (
    <div className="bg-primary-background h-screen w-screen">
      {renderTree(tree)}
    </div>
  )
}
export const ComponentTreeRenderer = memo(Renderer)
