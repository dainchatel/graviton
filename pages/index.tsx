import Link from 'next/link'
import Layout from '@/graviton/components/layout'
import { fetchData } from '@/graviton/lib/data'
import { Article, Props } from '@/graviton/types'
import SearchInput from '../components/searchInput'

export async function getServerSideProps() {
  try {
    const { previewArticles, locations } = await fetchData()
   
    return {
      props: {
        stays: [],
        articles: previewArticles,
        locations,
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

export default function Home( { articles, locations }: Props) {  
  return (
    <Layout locations={locations}>
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexGrow: '1',
      }}>
        <SearchInput/>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', width: '80vw' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            {articles.map((article: Article) => {
              const href = `/article?title=${encodeURIComponent(article.title)}`
              return (
                <Link 
                  key={article.id}
                  href={href}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                  }}
                >
                  <div 
                    style={{ 
                      margin: '0.5rem 0', 
                      padding: '2rem', 
                      maxWidth: '20rem', 
                      border: '1px solid black', 
                    }} 
                  >
                    <strong>{article.title}</strong>
                    <p>{article.text.substring(0, 100)}...</p>
                  </div>
                </Link>
              )
            })}
          </div>
          <Link 
            style={{
              color: 'black',
              marginTop: '1.5rem',
              textDecoration: 'none', 
            }}  
            href='/articles'
          >
            <strong>View All</strong>
          </Link>
        </div>
      </section>
    </Layout>
  )
}