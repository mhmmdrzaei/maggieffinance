import type {Metadata, Viewport} from 'next'
import localFont from 'next/font/local'
import {getHome} from '@/sanity/queries'
import {urlFor} from '@/sanity/image'
import './globals.css'

const soehne = localFont({
  src: '../fonts/soehne-buch.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-soehne',
})

const title = 'Maggie Flynn Finance'

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome()
  const description = home?.seo?.description
  const image = home?.seo?.image?.asset
    ? urlFor(home.seo.image).width(1200).height(630).fit('crop').url()
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: image ? [{url: image, width: 1200, height: 630}] : undefined,
    },
    twitter: {card: 'summary_large_image', title, description, images: image ? [image] : undefined},
  }
}

export const viewport: Viewport = {
  colorScheme: 'only light',
}

export default async function RootLayout({children}: LayoutProps<'/'>) {
  const home = await getHome()
  const style = home?.backgroundColor ? ({'--bg': home.backgroundColor} as React.CSSProperties) : undefined

  return (
    <html lang="en" className={soehne.variable} style={style}>
      <body>{children}</body>
    </html>
  )
}
