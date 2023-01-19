import { useEffect, useState } from 'react'
import { ImaginedImage } from '../providers/openai'
import { useSettings } from './useSettings'

export const useLatentLink = ({ alt }: { alt?: string }) => {
  const [href] = useState('#todo!')
  // TODO! need to separate internal links from external links
  return href
}
