import spinner from '../../assets/spinner.gif'
import { ImaginedImage } from '../../providers/stabilityai/types'

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
      images[i].src = spinner.src
      // images[i].width = 300
      // images[i].height = 300

      const response = await fetch(
        `/api/image?prompt=${encodeURIComponent(alt)}`
      )
      const { base64, seed, width, height, prompt } =
        (await response.json()) as ImaginedImage

      console.log('base64', base64)
      images[i].src = base64
    }
  }

  // setTimeout(() => {
  //   replaceImages()
  // }, 1000)
}
