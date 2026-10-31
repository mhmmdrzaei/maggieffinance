import {revalidateTag} from 'next/cache'
import {type NextRequest, NextResponse} from 'next/server'
import {parseBody} from 'next-sanity/webhook'

type WebhookPayload = {_type?: string}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    if (!secret) {
      return new NextResponse('Missing SANITY_REVALIDATE_SECRET', {status: 500})
    }

    // Validates the signature and waits for the Content Lake to be consistent
    const {isValidSignature, body} = await parseBody<WebhookPayload>(req, secret, true)

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', {status: 401})
    }
    if (!body?._type) {
      return new NextResponse('Bad request', {status: 400})
    }

    revalidateTag(body._type, {expire: 0})
    return NextResponse.json({revalidated: body._type, now: Date.now()})
  } catch (err) {
    console.error(err)
    return new NextResponse((err as Error).message, {status: 500})
  }
}
