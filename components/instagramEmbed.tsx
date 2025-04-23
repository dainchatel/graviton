export {}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

import { useEffect, useRef, memo } from 'react'
import Script from 'next/script'

function isValidInstagramEmbed(html: string): boolean {
  return (
    html.includes('instagram.com') &&
    html.includes('instagram-media') &&
    html.includes('<blockquote') &&
    !html.match(/<script(?!.*instagram\.com)/i)
  )
}

const InstagramEmbed = memo(function InstagramEmbed({ embedHTML }: { embedHTML: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Let Instagram hydrate the embed after it’s in the DOM
    if (window?.instgrm?.Embeds?.process) {
      window.instgrm.Embeds.process()
    }
  }, [])

  if (!isValidInstagramEmbed(embedHTML)) {
    console.warn('Invalid Instagram embed detected')
    return null
  }

  return (
    <>
      <Script 
        src="https://www.instagram.com/embed.js" 
        strategy="lazyOnload"
      />
      <div 
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: embedHTML }}
      />
    </>
  )
})

export default InstagramEmbed
