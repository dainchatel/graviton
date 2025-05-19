import { ArticleTile as ArticleTileType } from '@/graviton/types'
import ArticleTile from '@/graviton/components/articleTile'

type ComponentProps = {
  tile: ArticleTileType
}

export default function Spotlight({ tile }: ComponentProps) {
  return (
    <div style={
      { 
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center', 
      }
    }>
      <ArticleTile article={tile} />
    </div>
  )
}