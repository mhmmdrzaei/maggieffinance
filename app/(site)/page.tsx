import {getHome, type SanityImage} from '@/sanity/queries'
import {urlFor} from '@/sanity/image'
import {Footer, RichText} from './components'
import styles from './page.module.css'

const widths = [640, 828, 1080, 1280, 1600, 1920, 2400]

function BackgroundImage({image}: {image: SanityImage}) {
  const dims = image.asset?.metadata?.dimensions
  if (!image.asset || !dims) return null

  // Account for any crop set in the Studio when computing the aspect ratio
  const crop = image.crop
  const w = dims.width * (1 - (crop?.left ?? 0) - (crop?.right ?? 0))
  const h = dims.height * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0))
  const aspect = w / h

  const srcSet = widths.map((width) => `${urlFor(image).width(width).quality(80).url()} ${width}w`).join(', ')
  const style = {
    backgroundImage: image.asset.metadata?.lqip ? `url(${image.asset.metadata.lqip})` : undefined,
    '--focus': image.hotspot ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` : undefined,
  } as React.CSSProperties

  return (
    // eslint-disable-next-line @next/next/no-img-element -- served & resized by Sanity's image CDN
    <img
      className={styles.picture}
      src={urlFor(image).width(1600).quality(80).url()}
      srcSet={srcSet}
      sizes={`(orientation: portrait) 100vw, calc(100vh * ${aspect.toFixed(3)})`}
      width={Math.round(w)}
      height={Math.round(h)}
      alt={image.alt ?? ''}
      fetchPriority="high"
      decoding="async"
      style={style}
    />
  )
}

export default async function Home() {
  const home = await getHome()

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.content}>
          <RichText value={home?.content} />
        </section>
      </main>
      {home?.backgroundImage && <BackgroundImage image={home.backgroundImage} />}
      <Footer menu={home?.menu} />
    </div>
  )
}
