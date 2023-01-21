import { NextApiResponse, NextApiRequest } from 'next'
import { imagineImage, credentials, ImaginedImage } from 'providers/openai'
import { Settings } from 'types'

// The Images API is in beta.
// During this time the API and models will evolve based on your feedback.
// To ensure all users can prototype comfortably,
// the default rate limit is 20 images per minute, 50 per 5 minutes.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImaginedImage>
) {
  // http://localhost:1420
  // await fetch('/api/image?prompt=picture%20of%20a%20plate%20of%20freshly-baked%20chocolate%20chip%20cookies%2C%20golden%20brown%20and%20oozing%20melted%20chocolate')
  console.log('received request for', req.url)
  const prompt = decodeURIComponent(req.query.prompt.toString())
  try {
    credentials.model = decodeURIComponent(req.query.model.toString())
    credentials.apiKey = decodeURIComponent(req.query.apiKey.toString())
  } catch (err) {}
  if (!credentials.model || !credentials.apiKey) {
    throw new Error('no model or apiKey provided')
  }
  console.log('prompt:', prompt)
  const settings: Settings = {
    coreVendor: 'OpenAI',
    imageVendor: 'OpenAI_dalle2',
    speechToTextLanguage: '',
    useTurboPrompt: false,
    usePlanStep: false,
    useImproveStep: false,
    huggingFaceKey: '',
    huggingFaceModel: '',
    openAIKey: credentials.apiKey,
    openAIModel: credentials.model,
    customPlannerPrompt: '',
    customBuilderPrompt: '',
    customImproverPrompt: '',
    useAutoCherryPick: false,
    useVendorCherryPick: false,
    useMockData: false,
  }
  const data = await imagineImage(prompt, settings)
  return res.status(200).json(data)
}
