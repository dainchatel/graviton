import { getRecommendedContent } from '@/graviton/lib/helpers'
import { mockArticles, mockLocations } from './fixtures'

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