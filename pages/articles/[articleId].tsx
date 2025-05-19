import Link from 'next/link'
import { Layout, Markdown } from '@/graviton/components'
import { Article as ArticleType, DropdownLocation } from '@/graviton/types'
import { fetchData } from '@/graviton/lib/data'
import { GetServerSidePropsContext } from 'next'

type PageProps = { 
  article?: ArticleType, 
  dropdownLocations: DropdownLocation[]
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: PageProps }> {
  const { articles, dropdownLocations } = await fetchData()
  const { articleId } = context.params as { articleId: string }
  const article = articles.find(article => article.id === articleId)

  return {
    props: {
      article,
      dropdownLocations,
    },
  }

}

export default function Article({ article, dropdownLocations }: PageProps) {
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
          <p>By {article.author}</p>
          <Markdown value={article.text} />
        </div>
        <Link style={
          { 
            color: 'black', 
            textDecoration: 'none' }
        }  href='/articles'>
          <strong>All Articles</strong>
        </Link>
      </div>
    </Layout>
  )
}