import { useEffect, useState } from 'react'

import { imagineImage } from 'providers/openai'
import { useSettings } from './useSettings'
import mock from '../../public/mocks/mock.jpg'

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
  const isMocked = settings?.useMockData

  useEffect(() => {
    const fn = async () => {
      if (isMocked) {
        setSrc(mock.src)
        return
      }

      if (!openAIKey || !openAIModel || !alt) {
        // cannot generate the image yet
        return
      }

      console.log(`useImage: generating image for prompt ${alt}`)

      const { url, prompt, width, height } = await imagineImage(alt, settings)
      setSrc(url)
    }
    fn()
  }, [alt, openAIKey, openAIModel, isMocked])

  return src
}
