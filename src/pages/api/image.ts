import { NextApiResponse, NextApiRequest } from 'next'
import { getImage } from '../../providers/openai'
import { DalleImage } from '../../providers/openai/types'

// The Images API is in beta.
// During this time the API and models will evolve based on your feedback.
// To ensure all users can prototype comfortably,
// the default rate limit is 20 images per minute, 50 per 5 minutes.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DalleImage>
) {
  // http://localhost:1420
  // await fetch('/api/image?prompt=picture%20of%20a%20plate%20of%20freshly-baked%20chocolate%20chip%20cookies%2C%20golden%20brown%20and%20oozing%20melted%20chocolate')

  const prompt = decodeURIComponent(req.query.prompt.toString())
  console.log('prompt:', prompt)
  const data = await imagineImage(prompt)
  return res.status(200).json(data)
}
