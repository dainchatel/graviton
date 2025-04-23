import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ArticlesPage from '@/graviton/pages/articles'
import { mockArticles } from './fixtures'

describe('Articles Page', () => {
  
  it('renders articles from props', () => {
    render(<ArticlesPage articles={mockArticles} stays={[]} locations={[]} />)
    expect(screen.getByText('Our First Article')).toBeInTheDocument()
    expect(screen.getByText('Second Amazing Article')).toBeInTheDocument()
    expect(screen.getByText('New Amazing Article')).toBeInTheDocument()
    expect(screen.getByText('Last Article')).toBeInTheDocument()
    
  })
})