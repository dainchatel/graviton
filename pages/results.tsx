import { Article, Props, Stay } from '@/graviton/types'
import Layout from '@/graviton/components/layout'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { fetchData } from '@/graviton/lib/data'
import { useRouter } from 'next/router'

export async function getServerSideProps() {
  try {
    const { stays, articles, locations } = await fetchData()
    return {
      props: {
        stays,
        articles,
        locations,
      },
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return {
      props: {
        stays: [],
        articles: [],
        locations: [],
      },
    }
  }
}

export default function Results({ articles, stays, locations }: Props) {
  const router = useRouter()
  const { q } = router.query

  let matchingLocations: string[] = []
  let matchingStays: Stay[] = []
  let matchingArticles: Article[] = []

  if (q && typeof q === 'string') {
    const articleFuseShort = new Fuse(articles, {
      keys: ['title', 'author', 'tags'],
      threshold: 0.3,
    })
    
    const articleFuseLong = new Fuse(articles, {
      keys: ['text'],
      ignoreLocation: true,
      threshold: 0.3,
      minMatchCharLength: 4,
    })
    
    const stayFuseShort = new Fuse(stays, {
      keys: ['name', 'location', 'tags'],
      threshold: 0.4,
    })
    
    const stayFuseLong = new Fuse(stays, {
      keys: ['description'],
      ignoreLocation: true,
      threshold: 0.3,
      minMatchCharLength: 4,
    })

    const locationFuse = new Fuse(stays, {
      keys: ['location'],
      threshold: 0.4,
      includeScore: true,
    })

    const locationsResult = locationFuse.search(q)
    const locationSet = new Set<string>()
    locationsResult.forEach(result => {
      locationSet.add(result.item.location)
    })
    matchingLocations = [...locationSet]
    
    const shortStaysResult = stayFuseShort.search(q)
    const longStaysResult = stayFuseLong.search(q)
    const staySet = new Set<Stay>()
    shortStaysResult.forEach(result => {
      staySet.add(result.item)
    })
    longStaysResult.forEach(result => {
      staySet.add(result.item)
    })
    matchingStays = [...staySet]

    const shortArticlesResult = articleFuseShort.search(q)
    const longArticlesResult = articleFuseLong.search(q)
    const articleSet = new Set<Article>()
    shortArticlesResult.forEach(result => {
      articleSet.add(result.item)
    })
    longArticlesResult.forEach(result => {
      articleSet.add(result.item)
    })
    matchingArticles = [...articleSet]
  }
  return (
    <Layout locations={locations}>
      {
        matchingLocations.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <h1>Locations</h1>
            <div>
              {
                matchingLocations.map((location: string) => {
                  const href = `/location?name=${encodeURIComponent(location)}`
                  return (
                    <div style={{ padding: '2rem', width: '45rem', border: '1px solid #e0e0e0' }} key={location}>
                      <Link style={
                        {
                          color: 'black',
                          textDecoration: 'none',
                          fontSize: '1.5rem' }
                      } href={href}><strong>{location}</strong></Link>
                    </div>
                  )
                })
              }
            </div>
          </div>) : null
      }
      {
        matchingStays.length ? 
          (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <h1>Stays</h1>
            <div>
              {
                matchingStays.map((stay: Stay) => {
                  const anchorId = stay.name.toLowerCase().replace(/\s+/g, '-')
                  const href = `/location?name=${encodeURIComponent(stay.location)}#${anchorId}`
                  return (
                    <div style={{ padding: '2rem', width: '45rem', border: '1px solid #e0e0e0' }} key={stay.id}>
                      <Link style={
                        {
                          color: 'black',
                          textDecoration: 'none',
                          fontSize: '1.5rem' }
                      } href={href}><strong>{stay.name}</strong></Link>
                      <p>{stay.location}</p>
                      <p>{stay.description}</p>
                    </div>
                  )})
              }
            </div>
          </div>) : null
      }
      {
        matchingArticles.length ? (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <h1>Articles</h1>
          <div>
            {
              matchingArticles.map((article: Article) => {
                const href = `/article?title=${encodeURIComponent(article.title)}`
                return (
                  <div style={{ padding: '2rem', width: '45rem', border: '1px solid #e0e0e0' }} key={article.id}>
                    <Link style={
                      {
                        color: 'black',
                        textDecoration: 'none',
                        fontSize: '1.5rem' }
                    } href={href}><strong>{article.title}</strong></Link>
                    <p>By {article.author}</p>
                    <p>{article.text.substring(0, 200)}...</p>
                  </div>
                )})
            }
          </div>
        </div>) : null
      }
      <div style={{ height: '5rem' }}></div>
    </Layout>
  )
}

