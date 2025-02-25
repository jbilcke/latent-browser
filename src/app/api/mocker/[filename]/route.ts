import { NextRequest, NextResponse } from 'next/server'
import mime from 'mime-type/with-db'
import queryString from 'query-string'

import {
  // mockAny,
  mockImage,
  mockJSON,
  mockSTL,
  mockSVG,
  mockText,
} from '../../../../engine/prompts/mocker'

import { imagineHTML as openaiImagineHTML, imagineJSON as openaiImagineJSON, imagineScript as openaiImagineScript } from '@/providers/openai'
import { imagineHTML as anthropicImagineHTML, imagineJSON as anthropicImagineJSON, imagineScript as anthropicImagineScript } from '@/providers/anthropic'
import { presets } from '../../../../engine/prompts/presets'
import { persisted } from '@/providers/openai/getOpenAI'
import { LLMVendor } from '@/types'

// creates a substitute whenever we ask for an image that doesn't exist
// this will be useful if we use game libraries, as the LLM parrots tutorials that use images
export async function GET(req: NextRequest) {
  // TODO we need at least one initial call to populate the apiKey
  if (!persisted.model || !persisted.apiKey) {
    // TODO @julian: we should allow using the API mocker without server-side API token
    // credentials should be passed in the URL params or headers
    return NextResponse.json({ error: 'no model or apiKey provided. Please ask @jbilcke on GitHub to allow using the API mocker without server-side API tokens' }, { status: 401 });
  }

  const coreVendor = 'OPENAI' as LLMVendor

  // TODO we should pull those from the request params or headers
  const model = persisted.model
  const apiKey = persisted.apiKey
  const mockData = false

  const imagineHTML = coreVendor === 'ANTHROPIC' ? anthropicImagineHTML : openaiImagineHTML
  const imagineScript = coreVendor === 'ANTHROPIC' ? anthropicImagineScript : openaiImagineScript
  const imagineJSON = coreVendor === 'ANTHROPIC' ? anthropicImagineJSON : openaiImagineJSON

  const qs = queryString.parseUrl(req.url || "")
  const query = (qs || {}).query

  const referrer = req.headers.get("Referer")
  const filename = `${query.filename}` || 'placeholder.png'
  const lookup = mime.lookup(filename) || []
  const mimetypes = Array.isArray(lookup) ? lookup : [lookup]
  const mimetype = mimetypes[0] || 'text/plain'
  const parts = filename.split('.')
  const extension = (parts.pop() || "").toLowerCase()
  const name = parts.join('.')

  const settings = presets.mocker

  const headers = new Headers();
  let content = new Blob()

  if (
    !extension ||
    extension === '<no source>' ||
    typeof extension === 'undefined' ||
    extension === 'undefined' ||
    extension.length < 1
  ) {
    headers.set("Content-Type", mimetype)
    return new NextResponse(content, {
      status: 200,
      statusText: "OK",
      headers
    });
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
      headers.set("Content-Type", mime)
      return new NextResponse(data.url, {
        status: 200,
        statusText: "OK",
        headers
      })
    } else {
      return NextResponse.redirect(data.url)
    }
  } else if (['json'].includes(extension)) {
    const prompt = mockJSON(name)
    console.log('mock JSON:', {
      referrer,
      filename,
      name,
      prompt,
    })
    
    const data = await imagineJSON<Record<string, any>>({
      prompt,
      defaultValue: {},
      prefix: '{', 
      model,
      apiKey,
      mockData: {} as any
    })
    return NextResponse.json(data, {
      status: 200,
      statusText: "OK",
      headers,
    })
  } else if (['txt'].includes(extension)) {
    const prompt = mockText(name)
    console.log('mock text:', {
      referrer,
      filename,
      name,
      prompt,
    })
    const data = await imagineString({
      prompt,
      settings,
      model,
      apiKey,
    })
    headers.set('Content-Type', 'text/plain')
    return new NextResponse(data, {
      status: 200,
      statusText: "OK",
      headers
    })
  } else if (['stl'].includes(extension)) {
    const prompt = mockSTL(name)
    console.log('mock STL:', {
      referrer,
      filename,
      mimetype,
      name,
      prompt,
    })
    const data = await imagineString({
      prompt,
      settings,
      model,
      apiKey,
    })
    headers.set('Content-Type', mimetype)
    return new NextResponse(data, {
      status: 200,
      statusText: "OK",
      headers
    })
  } else if (['svg'].includes(extension)) {
    const prompt = mockSVG(name)
    console.log('mock SVG:', {
      referrer,
      filename,
      mimetype,
      name,
      prompt,
    })
    const data = await imagineString({
      prompt,
      settings,
      model,
      apiKey,
    })
    headers.set('Content-Type', mimetype)
    return new NextResponse(data, {
      status: 200,
      statusText: "OK",
      headers
    })
  } else {
    /*
    CURRENTLY DISABLED - TOO RISKY RIGHT NOW

    const prompt = mockAny(name, extension, mimetype)
    console.log(`mock any .${extension} (${mimetype}):`, {
      referrer,
      filename,
      extension,
      mimetype,
      name,
      prompt,
    })
    const data = await imagineString({ prompt, settings, model, apiKey })
    return res.setHeader('content-type', mimetype).status(200).send(data)
    */
    headers.set('Content-Type', mimetype)
    return new NextResponse("", {
      status: 404,
      statusText: "Not Found",
      headers
    })
  }
}
