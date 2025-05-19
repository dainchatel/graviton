import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/router'
import Results from '@/graviton/pages/results'
import { mockArticles, mockStays } from './fixtures'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Results', () => {
  it.skip('renders location, stays, and articles from a location query', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'berlin' } })

    render(<Results articles={mockArticles} locations={[]} dropdownLocations={[]}/>)
    
    expect(screen.getByText('Cities')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Our 12 Favorite Stays in Berlin', { selector: 'strong' })).toBeInTheDocument()
    })
    
    await waitFor(() => {
      mockStays.filter(stay => stay.location === 'Berlin').forEach(stay => {
        expect(screen.getByText(stay.name)).toBeInTheDocument()
      })
    })
  
    expect(screen.getByText('Articles')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Berlin in Spring', { exact: false })).toBeInTheDocument()
    })

    expect(screen.queryByText('Tokyo Tower Hotel')).not.toBeInTheDocument()

  })

  it('renders articles matching title', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'weekend' } })

    render(<Results articles={mockArticles} locations={[]} dropdownLocations={[]}/>)
    
    await waitFor(() => {
      expect(screen.getByText('Weekend in Lisbon')).toBeInTheDocument()
    })
  })

  it('renders articles matching text', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'Little Havana' } })

    render(<Results articles={mockArticles} locations={[]} dropdownLocations={[]}/>)
    
    await waitFor(() => {
      expect(screen.getByText('Under the Radar in Miami')).toBeInTheDocument()
    })
  })

  it('renders articles matching tags', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'art' } })

    render(<Results articles={mockArticles} locations={[]} dropdownLocations={[]}/>)
    
    await waitFor(() => {
      expect(screen.getByText('Under the Radar in Miami')).toBeInTheDocument()
    })
  })

  it('handles no matches gracefully', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'asdlkfjasldfkj' } })

    render(<Results articles={[]} locations={[]} dropdownLocations={[]}/>)
    
    await waitFor(() => {
      expect(screen.queryByText('Cities', { selector: 'h1' })).not.toBeInTheDocument()
      expect(screen.queryByText('Articles')).not.toBeInTheDocument()
      expect(screen.queryByText('Stays')).not.toBeInTheDocument()
    })
  })

  it('handles empty or missing query param', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: {} })

    render(<Results articles={mockArticles} locations={[]} dropdownLocations={[]}/>)
    
    await waitFor(() => {
      expect(screen.queryByText('Locations')).not.toBeInTheDocument()
    })
  })
})
