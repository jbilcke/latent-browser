import { onlyText } from 'react-children-utilities'

// import { useTheme } from '../../theme'
import { useScene } from './useScene'
import { renderTree } from './utils'

export const Scene = ({ children = '' }) => {
  const scene =
    typeof children === 'string' ? children.trim() : onlyText(children).trim()

  const tree = useScene(scene)
  // const [theme, setTheme] = useTheme()

  return (
    <div className="bg-primary-background h-screen w-screen">
      {renderTree(tree)}
    </div>
  )
}
