import type {Metadata} from 'next'
import Link from 'next/link'
import {getFormPage, getHome} from '@/sanity/queries'
import {Footer, RichText} from '../components'
import styles from '../page.module.css'
import form from './form.module.css'

export const metadata: Metadata = {
  alternates: {canonical: '/form'},
}

// Mailchimp's bot trap field is named after the list's `u` and `id` params
function honeypotName(action: string) {
  try {
    const params = new URL(action).searchParams
    return `b_${params.get('u')}_${params.get('id')}`
  } catch {
    return null
  }
}

export default async function FormPage() {
  const [page, home] = await Promise.all([getFormPage(), getHome()])
  const action = page?.mailchimpUrl
  const honeypot = action && honeypotName(action)

  return (
    <div className={`${styles.container} ${styles.form}`}>
      <nav className={styles.nav}>
        <div>
          <Link className={styles.button} href="/">
            <u>Home</u>
          </Link>
        </div>
      </nav>
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={form.mc}>
            {/* Plain HTML form posting straight to Mailchimp: no JavaScript needed */}
            <form action={action} method="post" target="_blank" className={form.form}>
              {page?.heading && <h1 className={form.title}>{page.heading}</h1>}
              <RichText value={page?.intro} />
              <div className={form.required}>
                <span className={form.asterisk}>*</span> indicates required
              </div>
              <div className={form.field}>
                <label htmlFor="mce-EMAIL">
                  Email Address <span className={form.asterisk}>*</span>
                </label>
                <input type="email" name="EMAIL" id="mce-EMAIL" autoComplete="email" required />
              </div>
              <div className={form.field}>
                <label htmlFor="mce-FNAME">First Name</label>
                <input type="text" name="FNAME" id="mce-FNAME" autoComplete="given-name" />
              </div>
              <div className={form.field}>
                <label htmlFor="mce-LNAME">Last Name</label>
                <input type="text" name="LNAME" id="mce-LNAME" autoComplete="family-name" />
              </div>
              {honeypot && (
                <div aria-hidden="true" className={form.honeypot}>
                  <input type="text" name={honeypot} tabIndex={-1} defaultValue="" autoComplete="off" />
                </div>
              )}
              <div className={form.foot}>
                <input type="submit" value={page?.buttonLabel || 'Subscribe'} className={form.button} />
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer menu={home?.menu} />
    </div>
  )
}
