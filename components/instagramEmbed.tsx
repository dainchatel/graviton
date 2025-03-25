import Script from 'next/script'

export default function InstagramEmbed({ embedHTML }: { embedHTML: string }) {
  return (
    <>
      <Script 
        src="https://www.instagram.com/embed.js" 
        strategy="lazyOnload"
      />
      <div 
        dangerouslySetInnerHTML={{ __html: embedHTML }}
      />
    </>
  )
}