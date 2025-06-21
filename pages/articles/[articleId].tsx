import Link from 'next/link'
import { Layout, Markdown, ContentGrid } from '@/graviton/components'
import { Article as ArticleType, DropdownLocation, ArticleTile as ArticleTileType, LocationTile as LocationTileType } from '@/graviton/types'
import { fetchData } from '@/graviton/lib/data'
import { GetServerSidePropsContext } from 'next'
import { getRecommendedContent } from '@/graviton/lib/helpers'

type PageProps = { 
  article?: ArticleType, 
  dropdownLocations: DropdownLocation[]
  recommendedArticles: ArticleTileType[]
  recommendedLocations: LocationTileType[]
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: PageProps }> {
  const { articles, dropdownLocations, locations } = await fetchData()
  const { articleId } = context.params as { articleId: string }
  const article = articles.find(article => article.id === articleId)

  if (!article) {
    return {
      props: {
        article: undefined,
        dropdownLocations,
        recommendedArticles: [],
        recommendedLocations: [],
      },
    }
  }

  const { recommendedArticles, recommendedLocations } = getRecommendedContent(article, articles, locations)

  return {
    props: {
      article,
      dropdownLocations,
      recommendedArticles,
      recommendedLocations,
    },
  }
}

export default function Article({ article, dropdownLocations, recommendedArticles, recommendedLocations }: PageProps) {
  if (!article) {
    return (
      <Layout dropdownLocations={dropdownLocations}>
        <h1>Uh oh, couldn&apos;t find what you were looking for!</h1>
      </Layout>
    )
  }
  
  return (
    <Layout dropdownLocations={dropdownLocations}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ padding: '0 2rem 2rem 2rem', maxWidth: '45rem' }} key={article.id}>   
          <h3 style={{ fontSize: '2rem' }}>{article.title}</h3>
          <p>{article.author}</p>
          <>{new Date(article.updatedAt!).toDateString()}</>
          <Markdown value={article.text} />
        </div>
        {(recommendedArticles.length > 0 || recommendedLocations.length > 0) ? (
          <div style={{ marginTop: '2rem', width: '100%', maxWidth: '832px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
              Read More
            </h3>
            <ContentGrid
              articles={recommendedArticles}
              locations={recommendedLocations}
              sortBy="updatedAt"
            />
          </div>
        ) : null}
      </div>
    </Layout>
  )
}