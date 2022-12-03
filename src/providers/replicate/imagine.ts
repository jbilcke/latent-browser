import { replicate, type StableDiffusion } from '.'

let model: { predict: StableDiffusion }

export const getImage = async (prompt: string) => {
  if (!model) {
    console.log('warming-up the caption model..')
    model = await replicate<StableDiffusion>`stability-ai/stable-diffusion`
  }
  try {
    console.log('generating image from caption..')
    const [url] = await model.predict({ prompt })
    console.log('generated url:', url)
    return (url || '').trim()
  } catch (err) {
    console.log(err)
    return ''
  }
}
