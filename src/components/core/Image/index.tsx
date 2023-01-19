import { useImage } from '../../../hooks/useImage'
import { onlyText } from 'react-children-utilities'

export const Image = ({
  children,
  width,
  height,
}: {
  children: string
  width: string
  height: string
}) => {
  const alt = onlyText(children)
  const src = useImage({ alt, width, height })

  return src ? <img alt={alt} src={src} width={width} height={height} /> : null
}
