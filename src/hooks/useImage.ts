import { useEffect, useState } from 'react'

import { imagineImage } from '../providers/openai'
import { useSettings } from './useSettings'

export const useImage = ({
  alt,
  width,
  height,
}: {
  alt?: string
  width?: number | string
  height?: number | string
}) => {
  const [src, setSrc] = useState('')
  const [settings] = useSettings()
  const openAIKey = settings?.openAIKey
  const openAIModel = settings?.openAIModel

  useEffect(() => {
    const fn = async () => {
      if (!openAIKey || !openAIModel || !alt) {
        // cannot generate the image yet
        return
      }

      console.log(`useImage: generating image for prompt ${alt}`)

      const { url, prompt, width, height } = await imagineImage(alt, settings)
      setSrc(url)
    }
    fn()
  }, [alt, openAIKey, openAIModel])

  return src
}
