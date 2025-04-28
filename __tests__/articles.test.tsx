import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ArticlesPage from '@/graviton/pages/articles'
import { mockArticles, mockHome } from './fixtures'

describe('Articles Page', () => {
  
  it('renders articles from props', () => {
    render(<ArticlesPage articles={mockArticles} stays={[]} locations={[]} home={mockHome} />)
    expect(screen.getByText('Where to Stay in Berlin')).toBeInTheDocument()
    expect(screen.getByText('Under the Radar in Miami')).toBeInTheDocument()
    expect(screen.getByText('Day Trips from Lisbon')).toBeInTheDocument()    
    expect(screen.getByText('Exploring Hidden Tokyo')).toBeInTheDocument()    

  })
})