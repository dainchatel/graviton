import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { name } from '@/graviton/lib/consts'
import Home from '@/graviton/pages'
import { mockStays, mockArticles } from './fixtures/index'

jest.unmock('next/router')

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
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home stays={mockStays} articles={mockArticles} />)
 
    const heading = screen.getByText(name)
    const berlinRegion = screen.getByText('Berlin')
    const tokyoRegion = screen.getByText('Tokyo')
    const mexicoCityRegion = screen.queryByText('Mexico City')
    const articlesLink = screen.getByText('View All Articles')
 
    expect(heading).toBeInTheDocument()
    expect(berlinRegion).toBeInTheDocument()
    expect(tokyoRegion).toBeInTheDocument()
    expect(mexicoCityRegion).not.toBeInTheDocument()

    // first three articles should be rendered with previews
    expect(screen.getByText('Our First Article')).toBeInTheDocument()
    expect(screen.getByText('Second Amazing Article')).toBeInTheDocument()
    expect(screen.getByText('New Amazing Article')).toBeInTheDocument()
    // and all articles link
    expect(articlesLink).toBeInTheDocument()
    //but fourth article should not 
    expect(screen.queryByText('Last Article')).not.toBeInTheDocument()
  })

  
  it('updates input value when user types', () => {
    render(<Home stays={mockStays} articles={mockArticles} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()

    const input = screen.getByPlaceholderText('Search...')
    expect(input).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'test query' } })
    expect((input as HTMLInputElement).value).toBe('test query')

    fireEvent.submit(input)
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/results',
      query: { q: 'test query' },
    })
  })
})