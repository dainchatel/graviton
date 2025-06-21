import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import ArticlePage from '@/graviton/pages/articles/[articleId]'
import { mockArticleTiles, mockLocationTiles, mockDropdownLocations, mockArticles } from './fixtures'

describe('Article Page', () => {
  it('renders fallback when article is undefined', () => {
    render(
      <ArticlePage
        article={undefined}
        dropdownLocations={[]}
        recommendedArticles={[]}
        recommendedLocations={[]}
      />,
    )

    expect(
      screen.getByText("Uh oh, couldn't find what you were looking for!"),
    ).toBeInTheDocument()
  })

  it('renders the article title, author, and markdown links', () => {
    render(
      <ArticlePage
        article={mockArticles[0]}
        dropdownLocations={mockDropdownLocations}
        recommendedArticles={[]}
        recommendedLocations={[]}
      />,
    )

    expect(screen.getByText('Exploring Hidden Tokyo')).toBeInTheDocument()
    expect(screen.getByText('Jem Doe')).toBeInTheDocument()

    const alleywaysLink = screen.getByRole('link', { name: 'alleyways' })
    expect(alleywaysLink).toHaveAttribute('href', '/')

    const tokyoOftenLink = screen.getByRole('link', { name: 'Tokyo often' })
    expect(tokyoOftenLink).toHaveAttribute('href', 'http://google.com')
  })

  it('renders recommended article and location tiles', () => {
    const locationTile = mockLocationTiles[0]
    render(
      <ArticlePage
        article={mockArticles[0]}
        dropdownLocations={mockDropdownLocations}
        recommendedArticles={[mockArticleTiles[1]]}
        recommendedLocations={[locationTile]}
      />,
    )

    const recommendedSection = screen.getByText('Read More').parentElement!
    // Check for location tile
    const expectedLocationText = `Our ${locationTile.numberOfStays} Favorite Stays in ${locationTile.name}`
    expect(within(recommendedSection).getByText(expectedLocationText)).toBeInTheDocument()
    // Check for article tile
    expect(within(recommendedSection).getByText("Berlin in Spring: A Local's Guide")).toBeInTheDocument()
  })
})
