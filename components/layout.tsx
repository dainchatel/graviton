import Head from 'next/head'
import Link from 'next/link'
 
const name = '🏨'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={name} />
      </Head>
      <header>
        <h1 style={{ fontSize: '8rem' }}><Link href='/'>{name}</Link></h1>
      </header>
      <main>{children}</main>
    </div>
  )
}