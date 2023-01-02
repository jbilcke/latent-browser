import { replicate, type StableDiffusion } from '.'
import { ReplicateImage } from './types'

let model: { predict: StableDiffusion }

export const imagineImage = async (prompt: string): Promise<ReplicateImage> => {
  if (!model) {
    console.log('warming-up the caption model..')
    model = await replicate<StableDiffusion>`stability-ai/stable-diffusion`
  }

  console.log('generating image from caption..')
  const [url] = await model.predict({ prompt })
  console.log('generated url:', url)
  return {
    prompt,
    url: (url || '').trim(),
    width: 512,
    height: 512,
  }
}
