import { NextApiResponse, NextApiRequest } from 'next'

// TODO to avoid having to start a proxy in a separate shell, we could put Replicate calls in here
export default function handler(
  _req: NextApiRequest,
  res //: NextApiResponse<Person[]>
) {
  console.log('hello there!')

  // res.setHeader('Content-Type', 'image/jpg')
  return res.status(200).json({})
}
