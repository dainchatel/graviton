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
  it('renders only Tokyo stays', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { name: 'Tokyo' },
    })

    render(
      <Location
        stays={mockStays}
        articles={[]}
        locations={mockLocations}
        home={mockHome}
      />,
    )

    const tokyoStayNames = mockStays
      .filter(stay => stay.location === 'Tokyo')
      .map(stay => stay.name)

    const nonTokyoStayNames = mockStays
      .filter(stay => stay.location !== 'Tokyo')
      .map(stay => stay.name)

    // ✅ Should render all Tokyo stays
    tokyoStayNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })

    // ❌ Should NOT render non-Tokyo stays
    nonTokyoStayNames.forEach(name => {
      expect(screen.queryByText(name)).not.toBeInTheDocument()
    })

    // ✅ Should display the Tokyo location name somewhere
    expect(screen.getByText('Tokyo')).toBeInTheDocument()
  })
})
