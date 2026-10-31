import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {dataset, projectId} from './env'

const builder = createImageUrlBuilder({projectId, dataset})

// Images are resized and converted (webp/avif) by Sanity's CDN, so Vercel's
// image optimization is never used.
export const urlFor = (source: SanityImageSource) => builder.image(source).auto('format')
