import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../pages/'
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)
 
    const heading = screen.getByText('🏨')
    const staysLink = screen.getByText('View Stays')
    const articlesLink = screen.getByText('View Articles')
 
    expect(heading).toBeInTheDocument()
    expect(staysLink).toBeInTheDocument()
    expect(articlesLink).toBeInTheDocument()
  })
})