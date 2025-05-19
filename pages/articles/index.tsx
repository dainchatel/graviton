import { ArticleTile, DropdownLocation } from '@/graviton/types'
import { ContentGrid, Layout } from '@/graviton/components'
import { fetchData } from '@/graviton/lib/data'
import { asArticleTile } from '@/graviton/lib/articles'

type PageProps = {
  articles: ArticleTile[]
  dropdownLocations: DropdownLocation[]
}

export async function getServerSideProps(): Promise<{ props: PageProps }> {
  try {
    const { articles, dropdownLocations } = await fetchData()
    const articleTiles = articles
      .map(asArticleTile)

    return {
      props: {
        articles: articleTiles,
        dropdownLocations,
      },
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return {
      props: {
        articles: [],
        dropdownLocations: [],
      },
    }
  }
}

export default function Articles({ articles, dropdownLocations }: PageProps) {
  return (
    <Layout dropdownLocations={dropdownLocations}>
      <div style={
        {
          display: 'flex',
          justifyContent: 'center',
        }
      }>
        <ContentGrid articles={articles} locations={[]}/>
      </div>
    </Layout>
  )
}

