import Layout from '@/graviton/components/layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Props } from '@/graviton/types'
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

export default function Article({ articles }: Props) {
  const router = useRouter()
  const { title } = router.query
  
  const article = articles.find(article => article.title === title)
  
  if (!article) {
    return (
      <Layout>
        <h1>Uh oh, couldn&apos;t find what you were looking for!</h1>
        <p>No article found with title: {title}</p>
      </Layout>
    )
  }
  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ padding: '0 2rem 2rem 2rem', maxWidth: '45rem' }} key={article.id}>   
          <h3 style={{ fontSize: '2rem' }}>{article.title}</h3>
          <p>By {article.author}</p>
          <p>{article.text}</p>
          <div>Tags: {article.tags.map((tag: string, i: number) => (
            <span style={{ color: 'blue' }} key={tag}>{i === 0 ? '' : ', '}{tag}</span>
          ))}
          </div>
        </div>
        <Link style={{ 
          color: 'black', 
          textDecoration: 'none' }}  href='/articles'>
          <strong>View All Articles</strong>
        </Link>
      </div>
    </Layout>
  )
}