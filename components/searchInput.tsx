import { Search } from 'lucide-react'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'

const SearchInput = () => {
  const [query, setQuery] = useState('')
  const router = useRouter()
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Navigate to results page with query string
    router.push({
      pathname: '/results',
      query: { q: query },
    })
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        position: 'relative',
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '80%',
          paddingLeft: '12px',
          paddingRight: '40px',
          paddingTop: '8px',
          paddingBottom: '8px',
          border: '1px solid #d1d5db',
          borderRadius: '9999px',
          outline: 'none',
        }}
        placeholder="Search..."
      />
      <button
        type="submit"
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#9ca3af',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
        }}
      >
        <Search size={18} />
      </button>
    </form>
  )
}

export default SearchInput