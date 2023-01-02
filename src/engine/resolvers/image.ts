// import { imagineImage } from '../../providers/replicate/imagine'
import { imagineImage } from '../../providers/stabilityai'

import spinner from '../../assets/spinner.gif'
import { ImaginedImage } from '../../providers/stabilityai/types'
import { DalleImage } from '../../providers/openai/types'

export async function resolveImages() {
  // if (loopStarted) {
  //   return
  // }
  // loopStarted = true
  const images = document.getElementsByTagName('img')

  for (let i = 0; i < images.length; i++) {
    // get image src
    const src = images[i].src
    const alt = images[i].alt
    console.log('found image:', { alt, src })
    if (alt) {
      console.log('found image prompt:', alt)
      try {
        images[i].src = spinner.src
        // images[i].width = 300
        // images[i].height = 300
        // TODO: adapt the resolution to the image width/height
        // we could do one pass at low resolution, then use it as an img-to-img input for a second pass
        // although this is a waste of quota

        const response = await fetch(
          `/api/image?prompt=${encodeURIComponent(alt)}`
        )
        const { url, prompt, width, height } =
          (await response.json()) as DalleImage

        console.log('url', url)
        images[i].src = url
      } catch (err) {
        console.log('failed to replace an image:', err)
      }
    }
  }

  // setTimeout(() => {
  //   replaceImages()
  // }, 1000)
}
