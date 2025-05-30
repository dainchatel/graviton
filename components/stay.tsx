import { Stay as StayType } from '@/graviton/types'
import { brandColor } from '@/graviton/constants'
import InstagramEmbed from './instagramEmbed'
import Markdown from './markdown'
import Link from 'next/link'

import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export default function Stay({
  stay,
  index,
  onInView,
  isProgrammaticScroll,
  readyForScrollSync,
}: {
  stay: StayType
  index: number
  onInView: (index: number) => void
  isProgrammaticScroll: React.RefObject<boolean>
  readyForScrollSync: React.RefObject<boolean>
}) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false })

  useEffect(() => {
    if (inView && !isProgrammaticScroll.current && readyForScrollSync.current) {
      onInView(index)
    }
  }, [inView, index, onInView, isProgrammaticScroll, readyForScrollSync])

  return (
    <div
      ref={ref}
      id={stay.name.toLowerCase().replace(/\s+/g, '-')}
      style={{ paddingTop: '2rem' }}
    >
      <strong style={{ fontSize: '1.2rem' }}>{stay.name}</strong>
      <p style={{ margin: '0.2rem' }}>{stay.address}</p>
      <p style={{ margin: '0.2rem' }}>{stay.price}</p>
      <div
        style={
          {
            border: `2px solid ${brandColor}`,
            padding: '8px 12px',
            borderRadius: '4px',
            marginTop: '0.5rem',
            display: 'inline-block',
          }
        }
      >
        <Link
          href={stay.link}
          target="_blank"
          rel="noopener noreferrer"
          style={
            {
              textDecoration: 'none',
              color: brandColor,
              fontWeight: 500,
            }
          }
        >
    Website
        </Link>
      </div>

      <br />
      <Markdown value={stay.description} />
      {
        !!stay.instagramEmbed && (<div style={{ padding: '2rem' }}>
          <InstagramEmbed embedHTML={stay.instagramEmbed} />
        </div>
        )
      }
    </div>
  )
}
