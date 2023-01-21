import { useEffect, useState } from 'react'

export const useMouseDown = () => {
  const [mouseDown, setMouseDown] = useState(false)

  useEffect(() => {
    const onMouseUp = (ev: MouseEvent) => {
      setMouseDown(false)
    }
    const onMouseDown = (ev: MouseEvent) => {
      setMouseDown(true)
    }

    window.addEventListener('onMouseUp', onMouseUp, true)
    window.addEventListener('onMouseDown', onMouseDown, true)

    return () => {
      window.removeEventListener('onMouseUp', onMouseUp, true)
      window.removeEventListener('onMouseDown', onMouseDown, true)
    }
  }, [])
  return mouseDown
}
