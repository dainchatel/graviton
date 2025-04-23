import { filterRawArticles, mapRawArticles } from './articles'
import { fetchFromGoogleAPI } from './google'
import { filterRawStays, mapRawStays } from './stays'

const STAYS = 'Stays'
const ARTICLES = 'Articles'

export const fetchData = async () => {
  const rawDocument = await fetchFromGoogleAPI()

  const sheets = rawDocument.sheetsByTitle
  const rawStays = await sheets[STAYS].getRows()
  const stays = rawStays
    .filter(filterRawStays)
    .map(mapRawStays)

  const rawArticles = await sheets[ARTICLES].getRows()
  const articles = rawArticles
    .filter(filterRawArticles)
    .map(mapRawArticles)

  const locationSet = new Set<string>()
  for (const stay of stays) {
    locationSet.add(stay.location)
  }

  const locations = [...locationSet].sort()
  const previewArticles = articles.reverse().slice(0, 3)

  return { stays, articles, locations, previewArticles }
}