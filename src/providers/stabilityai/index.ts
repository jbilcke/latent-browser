import { generateAsync } from 'stability-ts'

export interface ImagePrompt {
  apiKey: string
  prompt: string
  height: number
  width: number
}

export interface ImaginedImage {
  base64: string
  seed: number
  width: number
  height: number
  prompt: string
}

export interface ImageResponse {
  res: unknown
  images: ImaginedImage[]
}

// don't do this at home!
// if we deploy one day to the cloud, we MUST rewrite this..
export const credentials = {
  apiKey: '',
}

export const getImage = async ({
  apiKey = '',
  prompt = '',
  height = 512,
  width = 512,
}: ImagePrompt) => {
  // don't do this at home!
  // if we deploy one day to the cloud, we MUST rewrite this..
  credentials.apiKey = apiKey || credentials.apiKey

  try {
    const result = await generateAsync({
      prompt,
      apiKey,
      width,
      height,
    })
    console.log(result)
    // return images[0]
    const images = result
    return images[0]
  } catch (e) {
    return ''
  }
}

export const getEnvironmentMap = async ({ apiKey, prompt }: ImagePrompt) =>
  getImage({
    prompt:
      '3d panorama|stereoscopic Stereo Equirectangular painting by vincent van gogh|top trending gallery at the louvre',
    apiKey,
    width: 1024,
    height: 512,
  })
