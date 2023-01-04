// import { imagineImage } from '../../providers/replicate/imagine'
import { imagineImage } from '../../providers/stabilityai'

import spinner from '../../assets/spinner.gif'
import { DalleImage } from '../../providers/openai/types'
import { openAIUseMockData } from '../../config'

export async function resolveImages(model: string, apiKey: string) {
  if (openAIUseMockData) {
    return ''
  }
  // if (loopStarted) {
  //   return
  // }
  // loopStarted = true
  const images = document.getElementsByTagName('img')

  for (let i = 0; i < images.length; i++) {
    // get image src
    const src = images[i].src
    const alt = images[i].alt
    console.log('resolveImages> found image:', { alt, src })
    if (alt) {
      console.log('resolveImages> found image:', alt)
      try {
        images[i].src = spinner.src
        // images[i].width = 300
        // images[i].height = 300
        // TODO: adapt the resolution to the image width/height
        // we could do one pass at low resolution, then use it as an img-to-img input for a second pass
        // although this is a waste of quota

        const response = await fetch(
          `/api/image?prompt=${encodeURIComponent(
            alt
          )}&model=${encodeURIComponent(model)}&apiKey=${encodeURIComponent(
            apiKey
          )}`
        )
        const { url, prompt, width, height } =
          (await response.json()) as DalleImage

        console.log(
          'resolveImages> replacing src with url and deleting alt',
          url
        )
        images[i].src = url
        images[i].removeAttribute('alt')
      } catch (err) {
        console.log('resolveImages> failed to replace an image, weird', err)
      }
    }
  }

  // setTimeout(() => {
  //   replaceImages()
  // }, 1000)
}
