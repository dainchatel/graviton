import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Home from '@/graviton/pages'
import { name } from '@/graviton/constants'
import { mockArticles, mockLocations, mockStays, mockDropdownLocations } from './fixtures'

const mockReplace = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: mockReplace,
    pathname: '/',
    query: {},
    asPath: '/',
    isReady: true,
  }),
}))

describe('Home page', () => {
  beforeEach(() => {
    mockReplace.mockClear()
    render(
      <Home
        articles={mockArticles}
        locations={mockLocations}
        stays={mockStays}
        dropdownLocations={mockDropdownLocations}
      />,
    )
  })

  it('renders heading', () => {
    expect(screen.getByText(name)).toBeInTheDocument()
  })
  
  it('renders all articles and locations when search is empty', () => {
    mockArticles.forEach(article => {
      expect(screen.getByText(article.title)).toBeInTheDocument()
    })
    mockLocations.forEach(location => {
      expect(
        screen.getByText((content, element) =>
          element?.tagName.toLowerCase() === 'strong' &&
          new RegExp(`Our\\s+\\d+\\s+Favorite Stays in\\s+${location.name}`, 'i').test(content),
        ),
      ).toBeInTheDocument()
    })
  })

  describe('Search and Filtering', () => {
    it('filters articles by title', async () => {
      const input = screen.getByPlaceholderText(/search/i)
      fireEvent.change(input, { target: { value: 'Weekend' } })

      await waitFor(() => {
        expect(screen.getByText('Weekend in Lisbon')).toBeInTheDocument()
        expect(screen.queryByText('Exploring Hidden Tokyo')).not.toBeInTheDocument()
      })
    })

    it('filters articles by text content', async () => {
      const input = screen.getByPlaceholderText(/search/i)
      fireEvent.change(input, { target: { value: 'bookshops' } })

      await waitFor(() => {
        expect(screen.getByText('Exploring Hidden Tokyo')).toBeInTheDocument()
        expect(screen.queryByText('Weekend in Lisbon')).not.toBeInTheDocument()
      })
    })

    it('filters locations based on matching stays', async () => {
      const input = screen.getByPlaceholderText(/search/i)
      fireEvent.change(input, { target: { value: 'rooftop terrace' } })

      await waitFor(() => {
        expect(
          screen.getByText((content, element) =>
            element?.tagName.toLowerCase() === 'strong' &&
            /Our\s+\d+\s+Favorite Stays in\s+Berlin/i.test(content),
          ),
        ).toBeInTheDocument()
        expect(
          screen.queryByText((content, element) =>
            element?.tagName.toLowerCase() === 'strong' &&
            /Our\s+\d+\s+Favorite Stays in\s+Tokyo/i.test(content),
          ),
        ).not.toBeInTheDocument()
      })
    })
    
    it('shows no results for a query with no matches', async () => {
      const input = screen.getByPlaceholderText(/search/i)
      fireEvent.change(input, { target: { value: 'zzzzzzzz' } })

      await waitFor(() => {
        mockArticles.forEach(article => {
          expect(screen.queryByText(article.title)).not.toBeInTheDocument()
        })
      })
    })
    
    it('updates the URL with the search query', async () => {
      const input = screen.getByPlaceholderText(/search/i)
      fireEvent.change(input, { target: { value: 'testquery' } })

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith(
          {
            pathname: '/',
            query: { q: 'testquery' },
          },
          undefined,
          { shallow: true },
        )
      })
    })
  })

  it('article and location tiles contain working links', () => {
    const links = screen.getAllByRole('link')
    const hrefs = links.map(link => link.getAttribute('href'))

    expect(hrefs).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/^\/articles\/.+/),
        expect.stringMatching(/^\/locations\/.+/),
      ]),
    )
  })
})
