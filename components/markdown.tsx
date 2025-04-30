import MarkdownTag from 'markdown-to-jsx'
import Link from 'next/link'
import { brandColor } from '@/graviton/constants'

const linkStyle = {
  textDecoration: 'none',
  color: brandColor,
  fontWeight: 'bolder',
}

export default function MarkdownRenderer({ value }: { value: string }) {
  return (
    <MarkdownTag
      options={
        {
          forceBlock: true,
          overrides: {
            a: {
              component: ({
                href,
                children,
                ...rest
              }: {
              href?: string
              children: React.ReactNode
            }) =>
                href?.startsWith('/') ? (
                  <Link href={href} style={linkStyle} {...rest}>
                    {children}
                  </Link>
                ) : (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    {...rest}
                  >
                    {children}
                  </a>
                ),
            },
          },
        }
      }
    >
      {value}
    </MarkdownTag>
  )
}
