import { Article, Location, Stay, DropdownLocation, ArticleTile, LocationTile } from '@/graviton/types'
import { Layout, ContentGrid, SearchInput } from '@/graviton/components'
import Fuse from 'fuse.js'
import { fetchData } from '@/graviton/lib/data'
import { GetServerSidePropsContext } from 'next'
import { asLocationTile } from '../lib/locations'
import { asArticleTile } from '../lib/articles'

type PageProps = {
  dropdownLocations: DropdownLocation[]
  articles: ArticleTile[]
  locations: LocationTile[]
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: PageProps }> {
  try {
    const { stays, articles, locations, dropdownLocations } = await fetchData()
    const { q } = context.query

    let matchingLocations: LocationTile[] = []
    let matchingStays: Stay[] = []
    let matchingArticles: ArticleTile[] = []
  
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
      const locationSet = new Set<Location>()
      locationsResult.forEach(result => {
        const location = locations.find(location => location.name === result.item.location)
        if (location) {
          locationSet.add(location)
        }
      })
      matchingLocations = [...locationSet].map(asLocationTile)
      
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
      matchingArticles = [...articleSet].map(asArticleTile)
  
      console.log(matchingStays)
    }

    return {
      props: {
        dropdownLocations,
        articles: matchingArticles,
        locations: matchingLocations,
      },
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return {
      props: {
        dropdownLocations: [],
        articles: [],
        locations: [],
      },
    }
  }
}

export default function Results({ articles, locations, dropdownLocations  }: PageProps) {

  return (
    <Layout dropdownLocations={dropdownLocations}>
      <div>
        {
          locations.length
            ? <div style={
              {
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }
            }>
              <h1>Cities</h1>
              <ContentGrid locations={locations} articles={[]} />
            </div>
            : null
        }
        {
          articles.length
            ? <div style={
              {
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }
            }>
              <h1>Articles</h1>
              <ContentGrid locations={[]} articles={articles} />
            </div>
            : null
        }
        {
          !locations.length && !articles.length
            ? <div style={
              {
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }
            }>
              <h1>Sorry, no results. Try another search!</h1>
              <SearchInput/>
            </div>
            : null
        }
      </div>
    </Layout>
  )
}

