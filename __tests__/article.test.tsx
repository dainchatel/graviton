import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import ArticlePage from '@/graviton/pages/article'
import { mockArticles } from './fixtures'


jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Article Page', () => {
  
  
  it('renders correct article based on title query', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { title: 'Our First Article' },
    })

    render(<ArticlePage stays={[]} articles={mockArticles} />)
    
    expect(screen.getByText('Our First Article')).toBeInTheDocument()
    expect(screen.getByText('By Emma Pattiz')).toBeInTheDocument()
    expect(screen.getByText('Here is the article text')).toBeInTheDocument()
    expect(screen.getByText('hello', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('world', { exact: false })).toBeInTheDocument()
    expect(screen.queryByText('Second Amazing Article')).not.toBeInTheDocument()
  })
})