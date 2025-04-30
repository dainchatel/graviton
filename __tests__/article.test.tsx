import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import ArticlePage from '@/graviton/pages/article'
import { mockArticles, mockHome } from './fixtures'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Article Page', () => {
  it('renders correct article based on title query and displays markdown links', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { title: 'Berlin in Spring: A Local\'s Guide' },
    })

    render(
      <ArticlePage
        stays={[]}
        articles={mockArticles}
        locations={[]}
        home={mockHome}
      />,
    )

    // headline, by-line & tags still render
    expect(
      screen.getByText('Berlin in Spring: A Local\'s Guide'),
    ).toBeInTheDocument()
    expect(screen.getByText('By John Doe')).toBeInTheDocument()
    expect(
      screen.getByText('Berlin transforms the gritty urban landscape', {
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('City Life', { exact: false })).toBeInTheDocument()
    expect(
      screen.queryByText('Under the Radar in Miami'),
    ).not.toBeInTheDocument()

    // new: markdown links are rendered as anchors with correct hrefs
    const mauerparkLink = screen.getByRole('link', { name: 'Mauerpark' })
    expect(mauerparkLink).toBeInTheDocument()
    expect(mauerparkLink).toHaveAttribute(
      'href',
      'https://www.berliner-stadtpark.de/mauerpark',
    )

    const brandenburgLink = screen.getByRole('link', {
      name: 'Brandenburg Gate',
    })
    expect(brandenburgLink).toBeInTheDocument()
    expect(brandenburgLink).toHaveAttribute(
      'href',
      '/locations/berlin-brandenburg-gate',
    )
  })
})
