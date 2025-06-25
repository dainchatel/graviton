import { Article, Location, ArticleTile, LocationTile, Stay } from '@/graviton/types'
import { asArticleTile } from './articles'
import { asLocationTile } from './locations'
import Fuse from 'fuse.js'

export const getRecommendedContent = (
  currentArticle: Article,
  allArticles: Article[],
  allLocations: Location[],
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

export const filterContentByQuery = (
  query: string,
  articles: Article[],
  locations: Location[],
  stays: Stay[],
): { articles: ArticleTile[]; locations: LocationTile[] } => {
  if (!query.trim()) {
    return {
      articles: articles.map(asArticleTile),
      locations: locations.map(asLocationTile),
    }
  }
  const q = query.trim()

  // --- Fuse.js setup ---
  const articleFuseShort = new Fuse(articles, {
    keys: ['title', 'author', 'description'],
    threshold: 0.3,
  })
  const articleFuseLong = new Fuse(articles, {
    keys: ['text'],
    ignoreLocation: true,
    threshold: 0.3,
    minMatchCharLength: 4,
  })
  const stayFuseShort = new Fuse(stays, {
    keys: ['name', 'location', 'description', 'address'],
    threshold: 0.4,
  })
  const stayFuseLong = new Fuse(stays, {
    keys: ['description'],
    ignoreLocation: true,
    threshold: 0.3,
    minMatchCharLength: 4,
  })

  // --- Article results ---
  const shortArticlesResult = articleFuseShort.search(q)
  const longArticlesResult = articleFuseLong.search(q)
  const articleSet = new Set<Article>()
  shortArticlesResult.forEach(result => articleSet.add(result.item))
  longArticlesResult.forEach(result => articleSet.add(result.item))
  const filteredArticles = [...articleSet].map(asArticleTile)

  // --- Stay results ---
  const shortStaysResult = stayFuseShort.search(q)
  const longStaysResult = stayFuseLong.search(q)
  const staySet = new Set<Stay>()
  shortStaysResult.forEach(result => staySet.add(result.item))
  longStaysResult.forEach(result => staySet.add(result.item))
  const matchingStays = [...staySet]

  // --- Location results (from matching stays and direct location name/description match) ---
  const locationSet = new Set<Location>()
  // Add locations that match directly
  locations.forEach(location => {
    if (
      location.name.toLowerCase().includes(q.toLowerCase()) ||
      location.description.toLowerCase().includes(q.toLowerCase())
    ) {
      locationSet.add(location)
    }
  })
  // Add locations from matching stays
  matchingStays.forEach(stay => {
    const loc = locations.find(location => location.name === stay.location)
    if (loc) locationSet.add(loc)
  })
  const filteredLocations = [...locationSet].map(asLocationTile)

  return { articles: filteredArticles, locations: filteredLocations }
} 