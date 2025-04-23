import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { Plane } from 'lucide-react'

export default function SearchInput () {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push({
      pathname: '/results',
      query: { q: query },
    })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 700 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #E0E0E0',
            borderRadius: '9999px',
            padding: '1.2rem 1.5rem',
            backgroundColor: 'white',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            gap: '1.5rem',
          }}
        >
          <div style={{ flexGrow: 1, paddingLeft: '0.25rem' }}>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#111',
              marginBottom: '0.25rem',
              paddingLeft: '0.25rem', // 👈 match this
            }}>
              Where to?
            </div>
            <input
              id="search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations"
              style={{
                width: '100%',
                fontSize: '1.2rem',
                border: 'none',
                outline: 'none',
                fontWeight: 400,
                color: 'black',
                paddingLeft: '0.25rem', // 👈 match this too
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#5C2A68',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.75rem 1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Plane size={20} color="white" />
          </button>
        </div>
      </form>
    </div>
  )
}
