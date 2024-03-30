import { NextRequest, NextResponse } from 'next/server'
import queryString from 'query-string'

import { imagineImage, persisted } from '../../../providers/openai'
import { DalleImage } from '../../../providers/openai/types'

export async function GET(req: NextRequest) {

const { query } = queryString.parseUrl(req.url || "")

  try {
    persisted.model = decodeURIComponent(query.model?.toString() || "")
    persisted.apiKey = decodeURIComponent(query.apiKey?.toString() || "")
  } catch (err) {}
  if (!persisted.model || !persisted.apiKey) {
    return NextResponse.json({ error: 'no model or apiKey provided' }, { status: 401 });
  }

  const prompt = decodeURIComponent(query.prompt?.toString() || "")

  if (!prompt) {
    return NextResponse.json({ error: `missing prompt` }, { status: 422 });
  }

  const image: DalleImage = await imagineImage(prompt)

  return NextResponse.json(image, { status: 200 })
}