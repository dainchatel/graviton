'use client'
import { Layout, SearchInput, ContentGrid } from '@/graviton/components'
import { fetchData } from '@/graviton/lib/data'
import { Article, Location, Stay, DropdownLocation } from '@/graviton/types'
import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import { filterContentByQuery } from '@/graviton/lib/helpers'

// --- Fade animation styles ---
const fadeStyles: React.CSSProperties = {
  transition: 'opacity 0.3s',
  opacity: 1,
}

const fadeOutStyles: React.CSSProperties = {
  ...fadeStyles,
  opacity: 0,
}

type PageProps = {
  dropdownLocations: DropdownLocation[]
  articles: Article[]
  locations: Location[]
  stays: Stay[]
}

export async function getServerSideProps(): Promise<{ props: PageProps }> {
  const { dropdownLocations, locations, articles, stays } = await fetchData()
   
  return {
    props: {
      dropdownLocations,
      articles,
      locations,
      stays,
    },
  }
}

export default function Home(props: PageProps) {
  const router = useRouter()
  const [rawQuery, setRawQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [fading, setFading] = useState(false)

  // Initialize search from URL or reset when navigating home
  useEffect(() => {
    if (!router.isReady) return
    const urlQuery = typeof router.query.q === 'string' ? router.query.q : ''
    setRawQuery(urlQuery)
    setSearchQuery(urlQuery)
  }, [router.query.q, router.pathname, router.isReady])

  // Debounce the search input
  useEffect(() => {
    if (rawQuery === searchQuery) return
    setFading(true)
    const handler = setTimeout(() => {
      setSearchQuery(rawQuery)
      setFading(false)
      // Update the URL with the query param (shallow routing)
      router.replace({
        pathname: router.pathname,
        query: rawQuery ? { q: rawQuery } : {},
      }, undefined, { shallow: true })
    }, 300)
    return () => clearTimeout(handler)
  }, [rawQuery, searchQuery, router])

  const filteredContent = useMemo(() => {
    return filterContentByQuery(searchQuery, props.articles, props.locations, props.stays)
  }, [searchQuery, props.articles, props.locations, props.stays])
  
  return (
    <Layout dropdownLocations={props.dropdownLocations}>
      <section style={
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexGrow: '1',
        }
      }>
        <SearchInput onSearch={setRawQuery} value={rawQuery} />
        <div style={{ width: '80vw', minHeight: 400 }}>
          <div style={fading ? fadeOutStyles : fadeStyles}>
            <ContentGrid 
              articles={filteredContent.articles} 
              locations={filteredContent.locations} 
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}