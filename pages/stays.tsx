import Link from 'next/link'
import { useAppState } from './_app'
import { Stay } from '../types'
import Layout from '@/graviton/components/layout'

export default function Stays() {
  const { stays } = useAppState()
  
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Stays</h1>
      <ul>
        {stays.map(({ name, location, type, link }: Stay) => (
          <li key={name}>
            <strong>{name}</strong>
            <br />
            {location}
            <br />
            {type}
            <br />
            <Link href={link}></Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}