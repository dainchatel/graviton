import { mockArticles, mockStays, mockLocations } from '@/graviton/__tests__/fixtures'
import { filterRawArticles, mapRawArticles } from './articles'
import { filterRawLocations, mapRawLocations } from './locations'
import { fetchFromGoogleAPI } from './google'
import { filterRawStays, mapRawStays } from './stays'
import { Article, Home, Stay, Location, Props } from '@/graviton/types'

const STAYS = 'Stays'
const ARTICLES = 'Articles'
const LOCATIONS = 'Locations'

export const fetchData = async (): Promise<Props> => {
  let articles: Article[] = []
  let stays: Stay[] = []
  let tempLocations: Omit<Location, 'numberOfStays'>[] = []

  if (process.env.MOCK) {
    articles = mockArticles
    stays = mockStays
    tempLocations = mockLocations
  } else {
    const rawDocument = await fetchFromGoogleAPI()
    const sheets = rawDocument.sheetsByTitle

    const rawStays = await sheets[STAYS].getRows()
    stays = rawStays
      .filter(filterRawStays)
      .map(mapRawStays)

    const rawArticles = await sheets[ARTICLES].getRows()
    articles = rawArticles
      .filter(filterRawArticles)
      .map(mapRawArticles)

    const rawLocations = await sheets[LOCATIONS].getRows()
    tempLocations = rawLocations
      .filter(filterRawLocations)
      .map(mapRawLocations)
  }

  const locations: Location[] = []

  for (const location of tempLocations) {
    const numberOfStays = stays.filter(stay => stay.location === location.name).length
    if (numberOfStays > 0) {
      locations.push({ ...location, numberOfStays })
    }
  }

  const updatedLocations = locations.filter(location => !!location.updatedAt)

  const header = articles.find(article => !!article.header)

  if (!header) {
    throw new Error('No header article')
  }

  const subHeaders = articles.filter(article => !!article.subHeader)

  const home: Home = {
    header,
    subHeaders,
    updatedLocations,
  }

  return {
    stays,
    articles,
    locations,
    home,
  }
}

