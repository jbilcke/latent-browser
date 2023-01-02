import { NextApiResponse, NextApiRequest } from 'next'
import { imagineImage } from '../../providers/stabilityai'
import { ImaginedImage } from '../../providers/stabilityai/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImaginedImage>
) {
  // http://localhost:1420
  // await fetch('/api/image?prompt=picture%20of%20a%20plate%20of%20freshly-baked%20chocolate%20chip%20cookies%2C%20golden%20brown%20and%20oozing%20melted%20chocolate')

  const prompt = decodeURIComponent(req.query.prompt.toString())
  console.log('prompt:', prompt)
  const data = await imagineImage(prompt)
  return res.status(200).json(data)
}
