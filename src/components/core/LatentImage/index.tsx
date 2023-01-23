import { ReactNode } from 'react'
import { onlyText } from 'react-children-utilities'

import { useImage } from '~/hooks/useImage'
import { placeholder } from './placeholder'

export const LatentImage = ({
  children,
  className,
  width,
  height,
}: {
  children?: ReactNode
  className?: string
  width?: string | number
  height?: string | number
}) => {
  const alt = onlyText(children)
  const src = useImage({ alt, width, height }) || placeholder

  return (
    <img
      alt={alt}
      className={className || 'object-cover h-full w-full'}
      src={src}
      width={width}
      height={height}
    />
  )
}
