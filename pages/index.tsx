import { fetchData } from '@/graviton/lib'
import { Props } from '@/graviton/types'
import { Layout, SearchInput, ContentGrid } from '@/graviton/components'

export async function getServerSideProps() {
  try {
    const { home, locations } = await fetchData()
   
    return {
      props: {
        stays: [],
        articles: [],
        locations,
        home,
      },
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return {
      props: {
        stays: [],
        articles: [],
        locations: [],
      },
    }
  }
}

export default function Home( { locations, home }: Props) {  
  return (
    <Layout locations={locations}>
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
        <ContentGrid home={home} />
      </section>
    </Layout>
  )
}