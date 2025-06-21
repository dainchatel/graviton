import { Article, Location, ArticleTile, LocationTile } from '@/graviton/types'

export const getRecommendedContent = (
  currentArticle: Article,
  allArticles: Article[],
  allLocations: Location[]
): { recommendedArticles: ArticleTile[]; recommendedLocations: LocationTile[] } => {
  // Get location tiles for the article's locations
  const articleLocationTiles = allLocations
    .filter(location => currentArticle.locations.includes(location.id))
    .map(({ description: _description, ...rest }) => rest)

  // Get recent articles (excluding current article)
  const recentArticles = allArticles
    .filter(a => a.id !== currentArticle.id)
    .map(({ text: _text, ...rest }) => rest)

  // Combine location tiles and articles, prioritizing locations
  const recommendedLocations = articleLocationTiles.slice(0, 3)
  const remainingSlots = 3 - recommendedLocations.length
  const recommendedArticles = remainingSlots > 0 ? recentArticles.slice(-remainingSlots) : []

  return { recommendedArticles, recommendedLocations }
} 