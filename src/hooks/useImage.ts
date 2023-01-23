import { useEffect, useState } from 'react'

import {
  ImaginedImage,
  imagineImage as getFromOpenAI,
} from '~/providers/openai'
import { imagineImage as getFromSDAPI } from '~/providers/stablediffusionapi'

import { useSettings } from './useSettings'
import mock from '../../public/mocks/mock.jpg'

const noop = (): Promise<ImaginedImage> => null

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

  const imageVendor = settings?.imageVendor
  const isMocked = settings?.useMockImages
  const isReady = !!settings

  useEffect(() => {
    const fn = async () => {
      const provider =
        imageVendor === 'StableDiffusionAPI'
          ? getFromSDAPI
          : imageVendor === 'OpenAI_dalle2'
          ? getFromOpenAI
          : noop

      if (isMocked || !alt || !imageVendor || !provider) {
        setSrc(mock.src)
        return
      }

      console.log(
        `useImage: asking ${imageVendor} to generate image: ${alt}`,
        provider
      )

      const { url, width, height } = await provider(alt, settings)
      setSrc(url)
    }
    fn()
  }, [alt, imageVendor, isReady, isMocked])

  return src
}
