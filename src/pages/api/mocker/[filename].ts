import { NextApiResponse, NextApiRequest } from 'next'
import mime from 'mime-type/with-db'

import {
  mockAny,
  mockImage,
  mockJSON,
  mockSTL,
  mockSVG,
  mockText,
} from '../../../engine/prompts/mocker'
import {
  imagineImage,
  imagineJSON,
  imagineString,
} from '../../../providers/openai'

// creates a substitute whenever we ask for an image that doesn't exist
// this will be useful if we use game libraries, as GPT-3 parrots tutorials that use images
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // http://localhost:1420
  // await fetch('/api/image404/parrot.jpg')
  const referrer = req.headers.referer
  const filename = `${req.query?.filename}` || 'placeholder.png'
  const mimetypes = [].concat(mime.lookup(filename))
  const mimetype = mimetypes[0] || 'text/plain'
  const parts = filename.split('.')
  const extension = parts.pop().toLowerCase()
  const name = parts.join('.')

  if (
    !extension ||
    extension === '<no source>' ||
    typeof extension === 'undefined' ||
    extension === 'undefined' ||
    extension.length < 1
  ) {
    return res.setHeader('content-type', mimetype).status(200).send('')
  }

  if (['jpg', 'jpeg', 'webm', 'tga', 'gif', 'bmp'].includes(extension)) {
    const prompt = mockImage(name)
    console.log('mock image:', {
      referrer,
      filename,
      name,
      prompt,
    })
    const data = await imagineImage(prompt)

    // 307 means Temporary Redirect (we want to generate new images like this in the future)
    if (data.url.startsWith('data:image')) {
      const mime = data.url.split(':')[1].split(';')[0]
      return res.setHeader('content-type', mime).status(200).send(data.url)
    } else {
      return res.redirect(307, data.url)
    }
  } else if (['json'].includes(extension)) {
    const prompt = mockJSON(name)
    console.log('mock JSON:', {
      referrer,
      filename,
      name,
      prompt,
    })
    const data = await imagineJSON<Record<string, any>>(prompt, {}, '{')
    return res.status(200).json(data)
  } else if (['txt'].includes(extension)) {
    const prompt = mockText(name)
    console.log('mock text:', {
      referrer,
      filename,
      name,
      prompt,
    })
    const data = await imagineString(prompt, '')
    return res.setHeader('content-type', 'text/plain').status(200).send(data)
  } else if (['stl'].includes(extension)) {
    const prompt = mockSTL(name)
    console.log('mock STL:', {
      referrer,
      filename,
      mimetype,
      name,
      prompt,
    })
    const data = await imagineString(prompt, '')
    return res.setHeader('content-type', mimetype).status(200).send(data)
  } else if (['svg'].includes(extension)) {
    const prompt = mockSVG(name)
    console.log('mock SVG:', {
      referrer,
      filename,
      mimetype,
      name,
      prompt,
    })
    const data = await imagineString(prompt, '')
    return res.setHeader('content-type', mimetype).status(200).send(data)
  } else {
    const prompt = mockAny(name, extension, mimetype)
    console.log(`mock any .${extension} (${mimetype}):`, {
      referrer,
      filename,
      extension,
      mimetype,
      name,
      prompt,
    })
    const data = await imagineString(prompt, '')
    return res.setHeader('content-type', mimetype).status(200).send(data)
  }
}
