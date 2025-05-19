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
}

export default function ContentGrid({
  articles,
  locations,
}: ComponentProps) {
  const [mixedContent, setMixedContent] = useState<MixedItem[]>([])

  useEffect(() => {
    const sortedLocations = [...locations].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )

    const combined: MixedItem[] = [
      ...articles.map((a) => ({ type: 'ArticleTile' as const, data: a })),
      ...sortedLocations.map((l) => ({ type: 'LocationTile' as const, data: l })),
    ]

    // Shuffle
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[combined[i], combined[j]] = [combined[j], combined[i]]
    }

    setMixedContent(combined)
  }, [articles, locations])

  return (
    <div
      style={
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '80vw',
        }
      }
    >
      <div
        style={
          {
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
