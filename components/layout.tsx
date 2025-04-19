import Head from 'next/head'
import Link from 'next/link'
import { name } from '@/graviton/lib/consts'
import SearchInput from './searchInput'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ 
      fontFamily: 'Georgia', 
      color: 'black', 
      margin: '0 2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'left', 
    }}>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={name} />
      </Head>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <header>
          <h1 style={{ fontSize: '6rem' }}><Link  style={{ 
            color: 'black', 
            textDecoration: 'none',
            fontWeight: 'boldest',
          }} href='/'>{name}</Link></h1>
        </header>
        <SearchInput/>
      </div>
      <main>{children}</main>
      <footer style={{     display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        bottom: '1rem',
        width: '100%'  }}>© 2025</footer>
    </div>
  )
}