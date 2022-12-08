export const openAIApiToken = process.env.NEXT_PUBLIC_PROVIDER_OPENAI_API_TOKEN
export const openAIModel = process.env.NEXT_PUBLIC_PROVIDER_OPENAI_MODEL
export const openAIUser = process.env.NEXT_PUBLIC_PROVIDER_OPENAI_USER

export const replicateApiToken =
  process.env.NEXT_PUBLIC_PROVIDER_REPLICATE_API_TOKEN
export const replicateApiModel =
  process.env.NEXT_PUBLIC_PROVIDER_REPLICATE_API_MODEL
export const replicateProxyUrl =
  process.env.NEXT_PUBLIC_PROVIDER_REPLICATE_PROXY_URL

export const stabilityAIApiToken =
  process.env.NEXT_PUBLIC_PROVIDER_STABILITYAI_API_TOKEN
export const stabilityAIApiToURL =
  process.env.NEXT_PUBLIC_PROVIDER_STABILITYAI_API_URL

export const serviceImageModel = process.env.NEXT_PUBLIC_SERVICE_IMAGE_MODEL
export const serviceImageWidth = Number(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_WIDTH
)
export const serviceImageHeight = Number(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_HEIGHT
)

export const serviceImageSeed = Number(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_SEED
)
export const serviceImageSamples = Number(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_SAMPLES
)
export const serviceImageSteps = Number(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_STEPS
)
export const serviceImageScaledStep = Number(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_SCALED_STEP
)
export const serviceImageCFGScale = Number(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_CFG_SCALE
)
