import { ReactNode, useMemo } from 'react'
import { onlyText } from 'react-children-utilities'
import { getIcon } from './getIcon'

export const Icon = ({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) => {
  const ico = onlyText(children)
  const Icon = useMemo(() => getIcon(ico), [ico])

  return <Icon className={className} />
}
