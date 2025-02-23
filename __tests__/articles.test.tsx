import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { AppContext } from '../pages/_app'
import ArticlesPage from '../pages/articles'
import { Article } from '../types'

describe('Articles Page', () => {
  const mockArticles: Article[] = [
    { 
      id: '1', 
      title: 'Our First Article',
      author: 'Emma Pattiz',
      text: 'Here is the article text', 
      tags: [],
      image: 'img_url',
      header: false,
    },
    // ... other articles
  ]
    
  const renderWithContext = (component: React.ReactNode) => {
    return render(
      <AppContext.Provider 
        value={{
          stays: [],
          articles: mockArticles,
          setStays: jest.fn(),
          setArticles: jest.fn(),
        }}
      >
        {component}
      </AppContext.Provider>,
    )
  }
  
  it('renders articles from context', () => {
    renderWithContext(<ArticlesPage />)
    expect(screen.getByText('Our First Article')).toBeInTheDocument()
  })
})