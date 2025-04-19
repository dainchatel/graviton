import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/router'
import Results from '@/graviton/pages/results'
import { mockArticles, mockStays } from './fixtures/index'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Results', () => {
  it('renders locations', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'berlin' } })

    render(<Results stays={mockStays} articles={mockArticles} />)
    
    await waitFor(() => {
      expect(screen.getByText('Locations')).toBeInTheDocument()
      expect(screen.getByText('Berlin', { selector: 'strong' })).toBeInTheDocument()

    })
  })

  it('renders stays matched by name', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'bright' } })

    render(<Results stays={mockStays} articles={mockArticles} />)
    
    await waitFor(() => {
      expect(screen.getByText('Bright Apartment')).toBeInTheDocument()
    })
  })

  it('renders stays matching description', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'descryption' } })

    render(<Results stays={mockStays} articles={mockArticles} />)
    
    await waitFor(() => {
      expect(screen.getByText('Stays')).toBeInTheDocument()
      expect(screen.getByText('Bright Apartment')).toBeInTheDocument()
      expect(screen.getByText('The Dolli')).toBeInTheDocument()
    })
  })

  it('renders articles matching title', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'first' } })

    render(<Results stays={mockStays} articles={mockArticles} />)
    
    await waitFor(() => {
      expect(screen.getByText('Our First Article')).toBeInTheDocument()
    })
  })

  it('renders articles matching text', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'another' } })

    render(<Results stays={mockStays} articles={mockArticles} />)
    
    await waitFor(() => {
      expect(screen.getByText('Second Amazing Article')).toBeInTheDocument()
      expect(screen.getByText('New Amazing Article')).toBeInTheDocument()
    })
  })

  it('renders articles matching tags', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'Bogus' } })

    render(<Results stays={mockStays} articles={mockArticles} />)
    
    await waitFor(() => {
      expect(screen.getByText('Last Article')).toBeInTheDocument()
    })
  })

  it('handles no matches gracefully', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { q: 'asdlkfjasldfkj' } })

    render(<Results stays={mockStays} articles={mockArticles} />)
    
    await waitFor(() => {
      expect(screen.queryByText('Locations')).not.toBeInTheDocument()
      expect(screen.queryByText('Articles')).not.toBeInTheDocument()
      expect(screen.queryByText('Stays')).not.toBeInTheDocument()
    })
  })

  it('handles empty or missing query param', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: {} })

    render(<Results stays={mockStays} articles={mockArticles} />)
    
    await waitFor(() => {
      expect(screen.queryByText('Locations')).not.toBeInTheDocument()
    })
  })
})
