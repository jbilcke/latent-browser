import { getBoolean, getNumber, getString } from '../utils/config'

export const openAIApiToken = getString(
  process.env.NEXT_PUBLIC_PROVIDER_OPENAI_API_TOKEN
)
export const openAIModel = getString(
  process.env.NEXT_PUBLIC_PROVIDER_OPENAI_MODEL
)
export const openAIUser = getString(
  process.env.NEXT_PUBLIC_PROVIDER_OPENAI_USER
)
export const openAIUseMockData = getBoolean(
  process.env.NEXT_PUBLIC_PROVIDER_OPENAI_USE_MOCK_DATA
)

export const replicateApiToken = getString(
  process.env.NEXT_PUBLIC_PROVIDER_REPLICATE_API_TOKEN
)
export const replicateApiModel = getString(
  process.env.NEXT_PUBLIC_PROVIDER_REPLICATE_API_MODEL
)
export const replicateProxyUrl = getString(
  process.env.NEXT_PUBLIC_PROVIDER_REPLICATE_PROXY_URL
)

export const stabilityAIApiToken = getString(
  process.env.NEXT_PUBLIC_PROVIDER_STABILITYAI_API_TOKEN
)
export const stabilityAIApiToURL = getString(
  process.env.NEXT_PUBLIC_PROVIDER_STABILITYAI_API_URL
)

export const serviceImageModel = getString(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_MODEL
)
export const serviceImageWidth = getNumber(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_WIDTH
)
export const serviceImageHeight = getNumber(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_HEIGHT
)

export const serviceImageSeed = getNumber(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_SEED
)
export const serviceImageSamples = getNumber(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_SAMPLES
)
export const serviceImageSteps = getNumber(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_STEPS
)
export const serviceImageScaledStep = getNumber(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_SCALED_STEP
)
export const serviceImageCFGScale = getNumber(
  process.env.NEXT_PUBLIC_SERVICE_IMAGE_CFG_SCALE
)
