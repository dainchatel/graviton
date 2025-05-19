import Link from 'next/link'
import { LocationTile as LocationTileType } from '@/graviton/types'
import * as lucide from 'lucide-react'

const getIcon = (iconName: string) => {
  const Icon = lucide[iconName as keyof typeof lucide] as lucide.LucideIcon | undefined
  if (!Icon) return null
  return (<Icon size={50} />)
}

type ComponentProps = {
  location: LocationTileType
}

export default function LocationTile ({ location }: ComponentProps) {
  const href = `/locations/${location.id}`
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