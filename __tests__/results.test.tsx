import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/router'
import Results from '@/graviton/pages/results'
import { mockArticles, mockHome, mockLocations, mockStays } from './fixtures'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Results', () => {
  it('renders location, stays, and articles from a location query', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'berlin' } })

    render(<Results stays={mockStays} articles={mockArticles} locations={[]} home={mockHome}/>)
    
    expect(screen.getByText('Locations')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Berlin', { selector: 'strong' })).toBeInTheDocument()
    })
    
    expect(screen.getByText('Stays')).toBeInTheDocument()
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

  it('renders stays matched by name', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'prenzlauer' } })

    render(<Results stays={mockStays} articles={mockArticles} locations={[]} home={mockHome}/>)
   
    expect(screen.getByText('Stays')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('Prenzlauer Park View')).toBeInTheDocument()
    })
  })

  it('renders stays matching description words', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'achitecture' } })

    render(<Results stays={mockStays} articles={mockArticles} locations={mockLocations} home={mockHome}/>)
    
    await waitFor(() => {
      expect(screen.getByText('Stays')).toBeInTheDocument()
      expect(screen.getByText('Historic Mitte Hotel')).toBeInTheDocument()
      expect(screen.getByText('Intendente Boutique Hotel')).toBeInTheDocument()
      expect(screen.queryByText('Graça View Apartment')).not.toBeInTheDocument()
    })
  })

  it('renders articles matching title', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'weekend' } })

    render(<Results stays={mockStays} articles={mockArticles} locations={[]} home={mockHome}/>)
    
    await waitFor(() => {
      expect(screen.getByText('Weekend in Lisbon')).toBeInTheDocument()
    })
  })

  it('renders articles matching text', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'Little Havana' } })

    render(<Results stays={mockStays} articles={mockArticles} locations={[]} home={mockHome}/>)
    
    await waitFor(() => {
      expect(screen.getByText('Under the Radar in Miami')).toBeInTheDocument()
    })
  })

  it('renders articles matching tags', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'art' } })

    render(<Results stays={mockStays} articles={mockArticles} locations={[]} home={mockHome}/>)
    
    await waitFor(() => {
      expect(screen.getByText('Under the Radar in Miami')).toBeInTheDocument()
    })
  })

  it('handles no matches gracefully', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'asdlkfjasldfkj' } })

    render(<Results stays={mockStays} articles={mockArticles} locations={[]} home={mockHome}/>)
    
    await waitFor(() => {
      expect(screen.queryByText('Locations')).not.toBeInTheDocument()
      expect(screen.queryByText('Articles')).not.toBeInTheDocument()
      expect(screen.queryByText('Stays')).not.toBeInTheDocument()
    })
  })

  it('handles empty or missing query param', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: {} })

    render(<Results stays={mockStays} articles={mockArticles} locations={[]} home={mockHome}/>)
    
    await waitFor(() => {
      expect(screen.queryByText('Locations')).not.toBeInTheDocument()
    })
  })
})
