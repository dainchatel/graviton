import Link from 'next/link'
import Layout from '@/graviton/components/layout'
import { fetchData } from '@/graviton/lib/data'

export async function getStaticProps() {
  try {
    const { stays, articles } = await fetchData()
    console.log('got all the way here', stays[0])
    return { 
      props: { 
        stays, 
        articles, 
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

export default function Home() {
  return (
    <Layout>
      <section className="p-4">
        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Link href="/stays" className="text-blue-600 hover:underline">
          View Stays
          </Link>
          <Link href="/articles" className="text-blue-600 hover:underline">
          View Articles
          </Link>
        </nav>
      </section>
    </Layout>
  )
}


