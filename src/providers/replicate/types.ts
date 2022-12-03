export interface ReplicateConfig {
  token: string
  proxyUrl: string
  httpClient: any
  pollingInterval: number
}

export type StableDiffusion = ({ prompt }: { prompt: string }) => string[]
