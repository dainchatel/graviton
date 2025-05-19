import Head from 'next/head'
import Link from 'next/link'
import { name, brandColor } from '@/graviton/constants'
import CitiesDropdown from './citiesDropdown'
import { DropdownLocation } from '@/graviton/types'

type ComponentProps = {
  children: React.ReactNode, 
  dropdownLocations: DropdownLocation[]
}

export default function Layout({ children, dropdownLocations }: ComponentProps) {
  return (
    <div style={
      { 
        fontFamily: 'Georgia', 
        color: 'black', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'left', 
        minHeight: '100vh',
      }
    }>
      <Head>
        <title>{name}</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="og:title" content={name} />
      </Head>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '6rem', margin: '2rem 3rem' }}>
          <Link style={
            { 
              color: brandColor,
              textDecoration: 'none',
              fontWeight: 'boldest',
            }
          } href='/'>{name}
          </Link>
          <div style={{ fontSize: '1.23rem', fontWeight: 'normal', fontStyle: 'italic' }}>No commissions, no AI — just our favorite places to stay</div>
        </h1>
        <div style={{ margin: '0 3rem 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CitiesDropdown dropdownLocations={dropdownLocations}/>
        </div>
      </header>
      <main style={
        { 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
        // minHeight: 0, 
        }
      }>{children}</main>
      <footer>
        <div>© 2025</div>
      </footer>
    </div>
  )
}