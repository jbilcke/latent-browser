import { useEffect, useState } from 'react'

import { ImaginedImage } from '~/providers/openai'

import { useSettings } from './useSettings'

export const useServerSideImage = ({
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
      const response = await fetch(
        `/api/image?prompt=${encodeURIComponent(
          alt
        )}&model=${encodeURIComponent(openAIModel)}&apiKey=${encodeURIComponent(
          openAIKey
        )}`
      )
      const { url, prompt, width, height } =
        (await response.json()) as ImaginedImage
      setSrc(url)
    }
    fn()
  }, [alt, openAIKey, openAIModel])

  return src
}
