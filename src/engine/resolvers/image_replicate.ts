import spinner from '../../assets/spinner.gif'
import { ReplicateImage } from '../../providers/replicate/types'

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
      const { url, prompt, width, height } =
        (await response.json()) as ReplicateImage

      images[i].src = url
    }
  }

  // setTimeout(() => {
  //   replaceImages()
  // }, 1000)
}
