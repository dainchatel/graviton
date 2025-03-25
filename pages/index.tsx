import Link from 'next/link'
import Layout from '@/graviton/components/layout'
import { fetchData } from '@/graviton/lib/data'
import { Article, Props } from '@/graviton/types'

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

export default function Home( { stays, articles }: Props) {

  const locationSet = new Set<string>()
  for (const stay of stays) {
    locationSet.add(stay.location)
  }
  
  const locations = [...locationSet].sort()
  const previewArticles = articles.slice(0, 3)
  
  return (
    <Layout>
      <section className='p-4'>
        <nav style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {locations.map((location: string) => {
              const href = `/stays?location=${encodeURIComponent(location)}`
              return (
                <Link 
                  style={{
                    color: 'black',
                    fontSize: '3rem',
                    textDecoration: 'none', 
                  }} 
                  href={href} 
                  key={location}
                >
                  <strong>{location}</strong>
                </Link>
              )
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {previewArticles.map((article: Article) => {
              const href = `/article?title=${encodeURIComponent(article.title)}`
              return (
                <div 
                  style={{ 
                    margin: '1rem 0', 
                    padding: '2rem', 
                    maxWidth: '20rem', 
                    border: '1px solid black', 
                  }} 
                  key={article.id}
                >
                  <Link 
                    style={{
                      color: 'black',
                      textDecoration: 'none', 
                    }} 
                    href={href}
                  >
                    <strong>{article.title}</strong>
                  </Link>
                  <p>{article.text.substring(0, 100)}...</p>
                </div>
              )
            })}
            <Link 
              style={{
                color: 'black',
                textDecoration: 'none', 
              }}  
              href='/articles'
            >
              <strong>View All Articles</strong>
            </Link>
          </div>
        </nav>
      </section>
    </Layout>
  )
}