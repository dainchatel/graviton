import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ArticlePage from '@/graviton/pages/articles/[articleId]'
import { mockArticles } from './fixtures'

describe('Article Page – Hidden Tokyo', () => {
  it('renders article title, author, and markdown links', () => {
    render(
      <ArticlePage
        article={mockArticles[0]}
        dropdownLocations={[]}
      />,
    )

    expect(
      screen.getByText('Exploring Hidden Tokyo'),
    ).toBeInTheDocument()
    expect(screen.getByText('By Jem Doe')).toBeInTheDocument()

    // Check markdown-rendered links
    const alleywaysLink = screen.getByRole('link', { name: 'alleyways' })
    expect(alleywaysLink).toHaveAttribute('href', '/')

    const tokyoOftenLink = screen.getByRole('link', { name: 'Tokyo often' })
    expect(tokyoOftenLink).toHaveAttribute('href', 'http://google.com')

    // Check presence of fallback link
    const allArticlesLink = screen.getByRole('link', { name: 'All Articles' })
    expect(allArticlesLink).toHaveAttribute('href', '/articles')
  })

  it('renders fallback when article is undefined', () => {
    render(
      <ArticlePage
        article={undefined}
        dropdownLocations={[]}
      />,
    )

    expect(
      screen.getByText('Uh oh, couldn\'t find what you were looking for!'),
    ).toBeInTheDocument()
  })
})
