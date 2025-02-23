import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { AppContext } from '../pages/_app'
import StaysPage from '../pages/stays'
import { Stay } from '../types'

describe('Stays Page', () => {
  const mockStays: Stay[] = [
    { id: '1',
      name: 'The Dolli',
      tags: [],
      type: 'hotel',
      description: 'the description',
      coordinates: '1, 2',
      location: 'Berlin',
      link: 'fake_link' },
  ]
  

  // Create a wrapper component that provides the context
  const renderWithContext = (component: React.ReactNode) => {
    return render(
      <AppContext.Provider 
        value={{
          stays: mockStays,
          articles: [],
          setStays: jest.fn(),
          setArticles: jest.fn(),
        }}
      >
        {component}
      </AppContext.Provider>,
    )
  }

  it('renders stays from context', () => {
    renderWithContext(<StaysPage />)

    expect(screen.getByText('The Dolli')).toBeInTheDocument()
  })
})