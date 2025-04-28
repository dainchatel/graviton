import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Home from '@/graviton/pages'
import { name } from '@/graviton/constants'
import { mockStays, mockArticles, mockHome, mockLocations } from './fixtures/index'

const mockPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
    pathname: '/',
    query: {},
    asPath: '/',
    isReady: true,
  }),
}))

describe('Home page', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders heading', () => {
    render(
      <Home
        stays={mockStays}
        articles={mockArticles}
        locations={mockLocations}
        home={mockHome}
      />,
    )

    expect(screen.getByText(name)).toBeInTheDocument()
  })

  it('reveals city options when dropdown is clicked', () => {
    render(
      <Home
        stays={mockStays}
        articles={mockArticles}
        locations={mockLocations}
        home={mockHome}
      />,
    )

    const dropdownBtn = screen.getByRole('button', { name: /cities/i })
    fireEvent.click(dropdownBtn)

    mockLocations.forEach(loc =>
      expect(screen.getByText(loc.name)).toBeInTheDocument(),
    )
  })

  it('submits a search query and navigates to /results', () => {
    render(
      <Home
        stays={mockStays}
        articles={mockArticles}
        locations={mockLocations}
        home={mockHome}
      />,
    )

    const input = screen.getByPlaceholderText(/search/i)
    fireEvent.change(input, { target: { value: 'tokyo' } })

    expect((input as HTMLInputElement).value).toBe('tokyo')

    fireEvent.submit(input.closest('form') as HTMLFormElement)

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/results',
      query: { q: 'tokyo' },
    })
  })

  it('renders header article, sub-header tiles, and updated-location tiles', () => {
    render(
      <Home
        stays={mockStays}
        articles={mockArticles}
        locations={mockLocations}
        home={mockHome}
      />,
    )

    /* header:true article */
    expect(
      screen.getByText(mockArticles.find(article => article.header)?.title ?? 'This will never match'),
    ).toBeInTheDocument()

    /* all subHeader:true titles appear in the grid */
    const subHeaderTitles = mockArticles
      .filter(a => a.subHeader)
      .map(a => a.title)

    subHeaderTitles.forEach(title =>
      expect(screen.getByText(title)).toBeInTheDocument(),
    )

    /* every location that has updatedAt is shown as a tile */
    const updatedLocations = mockLocations
      .filter(l => l.updatedAt)

    updatedLocations.forEach(location =>
      expect(screen.getByText(`Our ${location.numberOfStays} Favorite Stays in ${location.name}`)).toBeInTheDocument(),
    )
  })

  it('article cards contain working links', () => {
    render(
      <Home
        stays={mockStays}
        articles={mockArticles}
        locations={mockLocations}
        home={mockHome}
      />,
    )

    const hrefs = screen
      .getAllByRole('link')
      .map(link => link.getAttribute('href'))

    expect(hrefs).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/^\/article\?title=/),
        '/articles', // View-all link
      ]),
    )
  })
})
