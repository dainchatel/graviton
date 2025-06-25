import { getRecommendedContent, filterContentByQuery } from '@/graviton/lib/helpers'
import { mockArticles, mockLocations, mockStays } from './fixtures'

describe('getRecommendedContent', () => {
  it('returns 3 locations when the article has 3+ locations', () => {
    const article = mockArticles.find(a => a.id === 'hidden-tokyo')!
    const { recommendedArticles, recommendedLocations } = getRecommendedContent(article, mockArticles, mockLocations)

    expect(recommendedLocations).toHaveLength(3)
    expect(recommendedLocations.map(l => l.name)).toEqual(['Tokyo', 'Berlin', 'Lisbon'])
    expect(recommendedArticles).toHaveLength(0)
  })

  it('returns 1 location and 2 articles when the article has 1 location', () => {
    const article = mockArticles.find(a => a.id === 'berlin-spring')!
    const { recommendedArticles, recommendedLocations } = getRecommendedContent(article, mockArticles, mockLocations)

    expect(recommendedLocations).toHaveLength(1)
    expect(recommendedLocations[0].name).toBe('Berlin')
    expect(recommendedArticles).toHaveLength(2)
    expect(recommendedArticles.map(a => a.title)).toEqual(['Day Trips from Lisbon', 'No Location Article'])
  })

  it('returns 3 articles when the article has no locations', () => {
    const article = mockArticles.find(a => a.id === 'no-location')!
    const { recommendedArticles, recommendedLocations } = getRecommendedContent(article, mockArticles, mockLocations)

    expect(recommendedLocations).toHaveLength(0)
    expect(recommendedArticles).toHaveLength(3)
    expect(recommendedArticles.map(a => a.title)).toEqual(['Where to Stay in Berlin', 'Under the Radar in Miami', 'Day Trips from Lisbon'])
  })
})

describe('filterContentByQuery', () => {
  it('returns all content when query is empty', () => {
    const { articles, locations } = filterContentByQuery('', mockArticles, mockLocations, mockStays)
    expect(articles.length).toBe(mockArticles.length)
    expect(locations.length).toBe(mockLocations.length)
  })

  it('filters articles by title', () => {
    const { articles } = filterContentByQuery('Weekend', mockArticles, mockLocations, mockStays)
    expect(articles.length).toBe(1)
    expect(articles[0].title).toBe('Weekend in Lisbon')
  })

  it('filters articles by text content', () => {
    const { articles } = filterContentByQuery('bookshops', mockArticles, mockLocations, mockStays)
    expect(articles.length).toBe(1)
    expect(articles[0].title).toBe('Exploring Hidden Tokyo')
  })

  it('filters locations by name', () => {
    const { locations } = filterContentByQuery('Miami', mockArticles, mockLocations, mockStays)
    expect(locations.some(loc => loc.name === 'Miami')).toBe(true)
  })

  it('filters locations based on matching stays', () => {
    const { locations } = filterContentByQuery('rooftop terrace', mockArticles, mockLocations, mockStays)
    expect(locations.length).toBe(1)
    expect(locations[0].name).toBe('Berlin')
  })

  it('filters locations based on state in stay addresses', () => {
    const { locations } = filterContentByQuery('Florida', mockArticles, mockLocations, mockStays)
    expect(locations.length).toBe(1)
    expect(locations[0].name).toBe('Miami')
  })

  it('filters locations based on zip code in stay addresses', () => {
    const { locations } = filterContentByQuery('33133', mockArticles, mockLocations, mockStays)
    expect(locations.length).toBe(1)
    expect(locations[0].name).toBe('Miami')
  })

  it('returns both articles and locations that match', () => {
    const { articles, locations } = filterContentByQuery('Berlin', mockArticles, mockLocations, mockStays)
    expect(articles.length).toBe(2)
    expect(locations.length).toBe(1)
  })

  it('returns no results for a query with no matches', () => {
    const { articles, locations } = filterContentByQuery('zzzzzzzz', mockArticles, mockLocations, mockStays)
    expect(articles.length).toBe(0)
    expect(locations.length).toBe(0)
  })
}) 