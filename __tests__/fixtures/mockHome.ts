import { Home } from '@/graviton/types'
import { mockArticles } from './mockArticles'
import { mockLocations } from './mockLocations'

export const mockHome: Home = {
  header: mockArticles[0],
  subHeaders: mockArticles.filter(article => article.subHeader),
  updatedLocations: mockLocations.filter(location => location.updatedAt),
}