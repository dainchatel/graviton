import { Article, Props } from '@/graviton/types'
import Layout from '@/graviton/components/layout'
import Link from 'next/link'
import { fetchData } from '@/graviton/lib/data'

export async function getServerSideProps() {
  try {
    const { stays, articles } = await fetchData()
    return {
      props: {
        stays,
        articles,
      },
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return {
      props: {
        stays: [],
        articles: [],
      },
    }
  }
}

export default function Articles({ articles }: Props) {
  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
        {articles.map((article: Article) => {
          const href = `/article?title=${encodeURIComponent(article.title)}`
          return (
            <div style={{ padding: '2rem', maxWidth: '45rem', border: '1px solid black' }} key={article.id}>
              <Link style={{
                color: 'black',
                textDecoration: 'none',
                fontSize: '1.5rem' }} href={href}><strong>{article.title}</strong></Link>
              <p>By {article.author}</p>
              <p>{article.text.substring(0, 200)}...</p>
            </div>
          )})}
      </div>
    </Layout>
  )
}

