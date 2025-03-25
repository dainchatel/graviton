import Link from 'next/link'
import { Stay, Props } from '@/graviton/types'
import { fetchData } from '@/graviton/lib/data'
import Layout from '@/graviton/components/layout'
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
  const { location } = router.query
  const filteredStays = stays.filter(stay => stay.location === location)
  
  return (
    <Layout>
      <h1 style={{ fontSize: '4rem' }}>{location}</h1>
      <ul>
        {filteredStays.map(({ name, location, type, description, image, link }: Stay) => (
          <li key={name}>
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
    </Layout>
  )
}