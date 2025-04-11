import Link from 'next/link'
import { Stay, Props } from '@/graviton/types'
import { fetchData } from '@/graviton/lib/data'
import Layout from '@/graviton/components/layout'
import MapComponent from '@/graviton/components/map'
import { useRouter } from 'next/router'
import InstagramEmbed from '../components/instagramEmbed'

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

export default function Stays({ stays }: Props) {
  const router = useRouter()
  const location = Array.isArray(router.query.location) 
    ? router.query.location[0] 
    : router.query.location || ''
  const filteredStays = stays.filter(stay => stay.location === location)
  
  if (location)
    return (
      <Layout>
        <h1 style={{ fontSize: '4rem' }}>{location}</h1>
        <main style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <ul>
            {filteredStays.map(({ name, location, type, description, image, link }: Stay) => (
              <li id={name.toLowerCase().replace(/\s+/g, '-')} key={name}>
                <strong>{name}</strong>
                <br />
                {location}
                <br />
                {type}
                <br />
                <p>{description}</p>
                <br />
                {!!image && <div style={{ padding: '2rem' }}><InstagramEmbed embedHTML={image}/></div>}
                <Link href={link}></Link>
              </li>),
            )}
          </ul>
          <div style={{ position: 'sticky', top: '1rem', alignSelf: 'flex-start' }}>
            <MapComponent
              stayMarkers={filteredStays.map(stay => ({ 
                name: stay.name, 
                latitude: Number(stay.coordinates.split(',')[0]), 
                longitude: Number(stay.coordinates.split(',')[1]) }))} 
            />
          </div>
        </main>
      </Layout>
    )
}