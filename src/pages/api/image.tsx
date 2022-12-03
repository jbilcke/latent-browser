import { NextApiResponse, NextApiRequest } from 'next'

export default function handler(
  _req: NextApiRequest,
  res //: NextApiResponse<Person[]>
) {
  console.log('hello there!')

  // res.setHeader('Content-Type', 'image/jpg')
  return res.status(200).json({})
}
