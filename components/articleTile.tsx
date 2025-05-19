import Link from 'next/link'
import Image from 'next/image'
import { ArticleTile as ArticleTileType } from '@/graviton/types'

type ComponentProps = {
  article: ArticleTileType, 
}

export default function ArticleTile ({ article }: ComponentProps) {
  const href = `/articles/${article.id}`
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
          alignItems: 'center',
        }
      }>
        {
          article.portraitImage && <Image
            src={article.portraitImage}
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
              height: '159px',
            }
          } 
        >
          <strong>{article.title}</strong>
          <p style={article.portraitImage ? { width: '60%' } : {}}>{article.description}</p>
        </div>
      </div>
    </Link>
  )
}