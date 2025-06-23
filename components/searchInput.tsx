import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { Plane } from 'lucide-react'
import { brandColor } from '@/graviton/constants'

type SearchInputProps = {
  onSearch?: (query: string) => void
  value?: string
}

export default function SearchInput({ onSearch, value }: SearchInputProps) {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    if (onSearch) {
      // Client-side search
      onSearch(query)
      setIsLoading(false)
    } else {
      // Server-side search (existing behavior)
      router.push({
        pathname: '/results',
        query: { q: query },
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    if (value === undefined) setQuery(newQuery)
    // Real-time search if onSearch is provided
    if (onSearch) {
      onSearch(newQuery)
    }
  }

  return (
    <div style={{ marginTop: '1.5rem', marginBottom: '3rem', display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 700 }}>
        <div
          style={
            {
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #E0E0E0',
              borderRadius: '9999px',
              padding: '1.2rem 1.5rem',
              backgroundColor: 'white',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              gap: '1.5rem',
            }
          }
        >
          <div style={{ flexGrow: 1, paddingLeft: '0.25rem' }}>
            <div style={
              {
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#111',
                marginBottom: '0.25rem',
                paddingLeft: '0.25rem', // 👈 match this
              }
            }>
              Where to?
            </div>
            <input
              id="search"
              type="text"
              value={value !== undefined ? value : query}
              onChange={handleInputChange}
              placeholder="Search destinations"
              style={
                {
                  width: '100%',
                  fontSize: '1.2rem',
                  border: 'none',
                  outline: 'none',
                  fontWeight: 400,
                  color: 'black',
                  paddingLeft: '0.25rem',
                }
              }
            />
          </div>

          <button
            type="submit"
            style={
              {
                backgroundColor: brandColor,
                border: 'none',
                borderRadius: '9999px',
                padding: '0.75rem 1.1rem',
                cursor: isLoading ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                opacity: isLoading ? 0.6 : 1,
              }
            }
            disabled={isLoading}
          >
            {
              isLoading ? (
                <div
                  style={
                    {
                      width: 18,
                      height: 18,
                      border: '2px solid white',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }
                  }
                />
              ) : (
                <Plane size={20} color="white" />
              )
            }
          </button>
        </div>
      </form>
    </div>
  )
}
