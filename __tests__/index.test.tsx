import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Home from '@/graviton/pages'
import { mockStays, mockArticles } from './fixtures/index'

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

  it('renders search input and all visible articles', () => {
    const previewArticles = mockArticles.slice(0, 3)
    render(<Home stays={mockStays} articles={previewArticles} locations={[]} />)

    // Ensure search input placeholder exists
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()

    // Check first 3 article titles render
    expect(screen.getByText('Our First Article')).toBeInTheDocument()
    expect(screen.getByText('Second Amazing Article')).toBeInTheDocument()
    expect(screen.getByText('New Amazing Article')).toBeInTheDocument()

    // Ensure only the last 3 are rendered
    expect(screen.queryByText('Last Article')).not.toBeInTheDocument()

    // Ensure preview text is included
    expect(screen.getAllByText(/\.\.\./).length).toBeGreaterThanOrEqual(3)

    // View All link works
    expect(screen.getByText(/view all/i)).toBeInTheDocument()
  })

  it('submits a search query and navigates to results', () => {
    render(<Home stays={mockStays} articles={mockArticles} locations={[]} />)

    const input = screen.getByPlaceholderText(/search/i)
    fireEvent.change(input, { target: { value: 'tokyo' } })

    // Should update value
    expect((input as HTMLInputElement).value).toBe('tokyo')

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)

    const form = input.closest('form')!
    fireEvent.submit(form)

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/results',
      query: { q: 'tokyo' },
    })
  })

  it('article cards contain working links with titles', () => {
    render(<Home stays={mockStays} articles={mockArticles} locations={[]} />)

    const hrefs = screen.getAllByRole('link').map(link => link.getAttribute('href'))

    expect(hrefs).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/^\/article\?title=/),
        '/articles',  
      ]),
    )
  })

  it('reveals city options when dropdown is clicked', () => {
    render(<Home stays={mockStays} articles={mockArticles} locations={[
      'Tokyo',
      'Berlin',
      'Lisbon',
    ]} />)
  
    // Click to open the dropdown
    const dropdownButton = screen.getByRole('button', { name: /cities/i }) // update "cities" if the label differs
    fireEvent.click(dropdownButton)
  
    // Cities should now appear in the DOM
    expect(screen.getByText('Tokyo')).toBeInTheDocument()
    expect(screen.getByText('Berlin')).toBeInTheDocument()
    expect(screen.getByText('Lisbon')).toBeInTheDocument()
  })
})
