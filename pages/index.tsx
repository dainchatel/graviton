import { Layout, SearchInput, ContentGrid } from '@/graviton/components'
import { fetchData } from '@/graviton/lib/data'
import { ArticleTile, DropdownLocation, LocationTile } from '@/graviton/types'
import { asArticleTile } from '@/graviton/lib/articles'
import { asLocationTile } from '../lib/locations'

type PageProps = {
  dropdownLocations: DropdownLocation[]
  spotlight: ArticleTile
  articleTiles: ArticleTile[]
  locationTiles: LocationTile[]
}
export async function getServerSideProps(): Promise<{ props: PageProps }> {
  const { dropdownLocations, locations, articles } = await fetchData()
  const spotlightArticle = articles
    .find(article => article.spotlight)
    
  if (!spotlightArticle) {
    throw new Error('No spotlight article!')
  }
 
  const articleTiles = articles
    .map(asArticleTile)
    
  const locationTiles = locations
    .map(asLocationTile)
   
  return {
    props: {
      dropdownLocations,
      spotlight: asArticleTile(spotlightArticle),
      articleTiles,
      locationTiles,
    },
  }

}

export default function Home(props: PageProps) {  
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
        <SearchInput/>
        {/* <Spotlight article={props.spotlight} /> */}
        <ContentGrid articles={props.articleTiles} locations={props.locationTiles} />
      </section>
    </Layout>
  )
}