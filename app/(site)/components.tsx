import Link from 'next/link'
import {PortableText, type PortableTextBlock, type PortableTextComponents} from 'next-sanity'
import type {HomePage} from '@/sanity/queries'
import styles from './page.module.css'

const isInternal = (href: string) => href.startsWith('/') || href.startsWith('#')

export function SmartLink({href, children}: {href: string; children: React.ReactNode}) {
  if (isInternal(href)) return <Link href={href}>{children}</Link>
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

const components: PortableTextComponents = {
  marks: {
    link: ({value, children}) =>
      value?.href ? (
        <SmartLink href={value.href}>
          <u>{children}</u>
        </SmartLink>
      ) : (
        <>{children}</>
      ),
  },
}

export function RichText({value}: {value?: PortableTextBlock[]}) {
  return value ? <PortableText value={value} components={components} /> : null
}

export function Footer({menu}: {menu?: HomePage['menu']}) {
  if (!menu?.length) return null
  return (
    <footer className={styles.footer}>
      <nav>
        {menu.map((item) =>
          item.url ? (
            <SmartLink key={item._key} href={item.url}>
              {item.name}
            </SmartLink>
          ) : null,
        )}
      </nav>
    </footer>
  )
}
