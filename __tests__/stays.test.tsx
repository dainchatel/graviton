import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import StaysPage from '@/graviton/pages/stays'
import { mockStays } from './fixtures'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/graviton/components/map', () => {
  const MockMap = () => <div data-testid="mock-map" />
  MockMap.displayName = 'MockMap'
  return MockMap
})

describe('Stays Page', () => {
  it('renders stays from context', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { location: 'Tokyo' },
    })

    render(<StaysPage stays={mockStays} articles={[]} />)
    // Berlin stays should not be rendered
    expect(screen.queryByText('The Dolli')).not.toBeInTheDocument()
    expect(screen.queryByText('The Hyatt')).not.toBeInTheDocument()

    // Tokyo stays should be
    expect(screen.getByText('Great Hotel')).toBeInTheDocument()
    expect(screen.getByText('Good Hotel')).toBeInTheDocument()
    expect(screen.getByText('Bright Apartment')).toBeInTheDocument()
    expect(screen.getByText('Tokyo')).toBeInTheDocument()
  })
})