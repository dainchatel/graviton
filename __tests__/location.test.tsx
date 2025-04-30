import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import Location from '@/graviton/pages/location'
import { mockHome, mockStays, mockLocations } from './fixtures'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/graviton/components/map', () => {
  const MockMap = () => <div data-testid="mock-map" />
  MockMap.displayName = 'MockMap'
  return MockMap
})

jest.mock('@/graviton/components/instagramEmbed', () => {
  const MockInstagramEmbed = () => <div data-testid="mock-instagram-embed" />
  MockInstagramEmbed.displayName = 'MockInstagramEmbed'
  return MockInstagramEmbed
})

describe('Location Page', () => {
  it('renders only Tokyo stays (and their markdown links)', () => {
    (useRouter as jest.Mock).mockReturnValue({ query: { name: 'Tokyo' } })

    render(
      <Location
        stays={mockStays}
        articles={[]}
        locations={mockLocations}
        home={mockHome}
      />,
    )

    // ✅ Tokyo stays appear
    mockStays
      .filter(s => s.location === 'Tokyo')
      .forEach(s => {
        expect(screen.getByText(s.name)).toBeInTheDocument()
      })

    // ❌ Non-Tokyo stays do NOT appear
    mockStays
      .filter(s => s.location !== 'Tokyo')
      .forEach(s => {
        expect(screen.queryByText(s.name)).not.toBeInTheDocument()
      })

    // ✅ Location header present
    expect(screen.getByText('Tokyo')).toBeInTheDocument()

    // ✅ Markdown link inside the patched stay renders correctly
    const teamLabLink = screen.getByRole('link', { name: 'teamLab Planets' })
    expect(teamLabLink).toBeInTheDocument()
    expect(teamLabLink).toHaveAttribute(
      'href',
      'https://teamlab.art/e/planets/',
    )
  })
})
