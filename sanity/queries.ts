import {cacheLife, cacheTag} from 'next/cache'
import {defineQuery, type PortableTextBlock} from 'next-sanity'
import {client} from './client'

const homeQuery = defineQuery(`*[_id == "homePage"][0]{
  content,
  "backgroundColor": backgroundColor.hex,
  backgroundImage{
    alt,
    hotspot,
    crop,
    asset->{_id, metadata{lqip, dimensions{width, height}}}
  },
  menu[]{_key, name, url},
  seo{description, image{asset->{_id}}}
}`)

export type SanityImage = {
  asset?: {_id: string; metadata?: {lqip?: string; dimensions?: {width: number; height: number}}}
  hotspot?: {x: number; y: number}
  crop?: {top: number; bottom: number; left: number; right: number}
  alt?: string
}

export type HomePage = {
  content?: PortableTextBlock[]
  backgroundColor?: string
  backgroundImage?: SanityImage
  menu?: {_key: string; name?: string; url?: string}[]
  seo?: {description?: string; image?: SanityImage}
}

export async function getHome() {
  'use cache'
  // Cached indefinitely; refreshed only by /api/revalidate (Sanity webhook) or a new deploy
  cacheLife('cms')
  cacheTag('homePage')
  return client.fetch<HomePage | null>(homeQuery)
}

const formQuery = defineQuery(`*[_id == "formPage"][0]{heading, intro, mailchimpUrl, buttonLabel}`)

export type FormPage = {
  heading?: string
  intro?: PortableTextBlock[]
  mailchimpUrl?: string
  buttonLabel?: string
}

export async function getFormPage() {
  'use cache'
  cacheLife('cms')
  cacheTag('formPage')
  return client.fetch<FormPage | null>(formQuery)
}
