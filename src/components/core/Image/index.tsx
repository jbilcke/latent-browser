import { ReactNode } from 'react'
import { onlyText } from 'react-children-utilities'

import { useImage } from '../../../hooks/useImage'
import { placeholder } from './placeholder'

export const Image = ({
  children,
  width,
  height,
}: {
  children?: ReactNode
  width?: string | number
  height?: string | number
}) => {
  const alt = onlyText(children)
  const src = useImage({ alt, width, height }) || placeholder

  return <img alt={alt} src={src} width={width} height={height} />
}
