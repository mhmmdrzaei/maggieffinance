import type {NextConfig} from 'next'

const year = 60 * 60 * 24 * 365

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  cacheLife: {
    // CMS content never revalidates on a timer, only via webhook
    cms: {stale: 60 * 5, revalidate: year, expire: year * 10},
  },
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}],
  },
}

export default nextConfig
