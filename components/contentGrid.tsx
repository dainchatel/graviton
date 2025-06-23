'use client'
import { useEffect, useState } from 'react'
import { 
  LocationTile as LocationTileType, 
  ArticleTile as ArticleTileType, 
} from '@/graviton/types'
import ArticleTile from './articleTile'
import LocationTile from './locationTile'

type MixedItem =
  | { type: 'ArticleTile'; data: ArticleTileType }
  | { type: 'LocationTile'; data: LocationTileType }

type ComponentProps = {
  articles: ArticleTileType[]
  locations: LocationTileType[]
  sortBy?: 'updatedAt' | 'alphabetical'
}

export default function ContentGrid({
  articles,
  locations,
  sortBy = 'updatedAt',
}: ComponentProps) {
  const [mixedContent, setMixedContent] = useState<MixedItem[]>([])

  useEffect(() => {
    const combined: MixedItem[] = [
      ...articles.map((a) => ({ type: 'ArticleTile' as const, data: a })),
      ...locations.map((l) => ({ type: 'LocationTile' as const, data: l })),
    ]

    // Sort based on the sortBy prop
    if (sortBy === 'updatedAt') {
      combined.sort((a, b) => 
        new Date(b.data.updatedAt).getTime() - new Date(a.data.updatedAt).getTime(),
      )
    } else if (sortBy === 'alphabetical') {
      combined.sort((a, b) => {
        const aTitle = a.type === 'ArticleTile' ? a.data.title : a.data.name
        const bTitle = b.type === 'ArticleTile' ? b.data.title : b.data.name
        return aTitle.toLowerCase().localeCompare(bTitle.toLowerCase())
      })
    }

    setMixedContent(combined)
  }, [articles, locations, sortBy])

  return (
    <div
      style={
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
        }
      }
    >
      <div
        style={
          mixedContent.length === 1
            ? {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              width: 'auto',
              alignItems: 'stretch',
              marginTop: '1rem',
              justifyItems: 'center',
            }
            : {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              width: '100%',
              alignItems: 'stretch',
              marginTop: '1rem',
            }
        }
      >
        {
          mixedContent.map((item, index) =>
            item.type === 'ArticleTile'
              ? (<ArticleTile article={item.data} key={`ArticleTile-${index}`} />)
              : (<LocationTile location={item.data} key={`LocationTile-${index}`} />),
          )
        }
      </div>
    </div>
  )
}
