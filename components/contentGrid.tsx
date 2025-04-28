import Link from 'next/link'
import Image from 'next/image'
import { Home, Location, Article } from '@/graviton/types'
import * as lucide from 'lucide-react'

export const getIcon = (iconName: string) => {
  const Icon = lucide[iconName as keyof typeof lucide] as lucide.LucideIcon | undefined
  if (!Icon) return null
  return <Icon size={50} />
}

const generateArticleTile = (article: Article, header: boolean, image?: string) => {
  const href = `/article?title=${encodeURIComponent(article.title)}`
  return (
    <Link 
      key={article.id}
      href={href}
      style={
        {
          color: 'black',
          textDecoration: 'none',
        }
      }
    >
      <div style={
        { 
          display: 'flex', 
          border: '1px solid #e0e0e0', 
          flexDirection: 'row', 
        }
      }>
        {
          image && <Image
            src={image}
            alt="Mock Instagram Post"
            width='400'
            height='400'
          />
        }
        <div 
          style={
            { 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0.5rem 0', 
              padding: '2rem', 
            }
          } 
        >
          <strong>{article.title}</strong>
          <p style={header ? { width: '60%' } : {}}>{article.text.substring(0, 100)}...</p>
        </div>
      </div>
    </Link>
  )
}

const generateUpdatedLocationTile = (location: Location) => {
  const href = `/location?name=${encodeURIComponent(location.name)}`
  return (
    <Link 
      key={location.id}
      href={href}
      style={
        {
          color: 'black',
          textDecoration: 'none',
          margin: 0,
        }
      }
    >
      <div 
        style={
          { 
            margin: '0', 
            padding: '2rem', 
            border: '1px solid #e0e0e0', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'space-evenly',
            minHeight: '175px',
          }
        } 
      >
        {getIcon(location.icon)}
        <p><strong>Our {location.numberOfStays.toString()} Favorite Stays in {location.name}</strong></p>
        <p style={
          { 
            fontStyle: 'italic', margin: 0, 
          }
        }>Updated {new Date(location.updatedAt!).toDateString()}</p>
      </div>
    </Link>
  )
}

export default function ContentGrid({ home }: { home: Home }) {
  const { header, subHeaders, updatedLocations } = home

  return (
    <div style={
      { 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80vw', 
      }
    }>
      <div style={
        { 
          display: 'flex', 
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center', 
        }
      }>
        {generateArticleTile(header, true, '/hotel.jpg')}
      </div>
      <div style={
        { 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          width: '100%',
          alignItems: 'stretch',
          marginTop: '1rem',
        }
      }>
        {subHeaders.map((article: Article) => generateArticleTile(article, false))}
      </div>
      <div style={
        { 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          width: '100%',
          alignItems: 'stretch',
          marginTop: '1rem',
        }
      }>
        {updatedLocations.map((location: Location) => generateUpdatedLocationTile(location))}
      </div>
      <Link 
        style={
          {
            color: 'black',
            marginTop: '1.5rem',
            textDecoration: 'none', 
          }
        }  
        href='/articles'
      >
        <strong>View All</strong>
      </Link>
    </div>
  )
}