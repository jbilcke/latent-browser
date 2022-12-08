import Generation from './generation_pb'
import { generationClient, metadata } from './stabilityai'
import { getRequest } from './stablediffusion'
import { ImaginedImage } from './types'

export const getImage = async (prompt: string): Promise<ImaginedImage> =>
  new Promise((resolve, reject) => {
    const { request, width, height } = getRequest(prompt)

    // Send the request using the `metadata` with our key from earlier
    const generation = generationClient.generate(request, metadata)

    // Set up a callback to handle data being returned
    generation.on('data', (data) => {
      let results: ImaginedImage[] = []
      let errors: string[] = []

      data.getArtifactsList().forEach((artifact) => {
        // Oh no! We were filtered by the NSFW classifier!
        if (
          artifact.getType() === Generation.ArtifactType.ARTIFACT_TEXT &&
          artifact.getFinishReason() === Generation.FinishReason.FILTER
        ) {
          errors.push('Your image was filtered by the NSFW classifier.')
          return
        }

        // Make sure we have an image
        if (artifact.getType() !== Generation.ArtifactType.ARTIFACT_IMAGE) {
          // todo: log this?
          return
        }

        try {
          const binary = new Uint8Array(artifact.getBinary() as Uint8Array)
          const asString = binary.reduce(
            (data, byte) => data + String.fromCodePoint(byte),
            ''
          )

          const base64 = Buffer.from(asString).toString('base64')

          // Here's how you get the seed back if you set it to `0` (random)
          const seed = artifact.getSeed()

          // We're done!
          results.push({ base64, seed, width, height, prompt })
        } catch (err) {
          errors.push(err.toString())
        }
      })

      if (results.length) {
        resolve(results[0])
      } else {
        reject(new Error('failed to generate image'))
      }
    })

    // Anything other than `status.code === 0` is an error
    generation.on('status', (status) => {
      if (status.code === 0) return
      console.error(
        'Your image could not be generated. You might not have enough credits.'
      )
      reject(
        new Error(
          'Your image could not be generated. You might not have enough credits.'
        )
      )
    })
  })
