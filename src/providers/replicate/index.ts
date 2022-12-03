import 'isomorphic-fetch'
import { replicateApiToken, replicateProxyUrl } from '../../config'
import Replicate from './lib'
import type { ReplicateConfig } from './types'
export type { StableDiffusion } from './types'

let client: Replicate

export const replicate = async <S>(
  name: TemplateStringsArray
): Promise<{ predict: S }> => {
  const modelName = name.join('')

  if (!client) {
    // see https://github.com/nicholascelestin/replicate-js
    client = new Replicate({
      token: replicateApiToken,
      proxyUrl: replicateProxyUrl,
    } as ReplicateConfig)
  }

  const model = await client.models.get(modelName)

  return model
}
