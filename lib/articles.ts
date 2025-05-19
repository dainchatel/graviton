import { Article, ArticleTile } from '@/graviton/types'
import { GoogleSpreadsheetRow } from 'google-spreadsheet'

const ID = 'ID'
const TITLE = 'Title'
const AUTHOR = 'Author'
const DESCRIPTION = 'Description'
const TEXT = 'Text'
const SPOTLIGHT = 'Spotlight'
const FEATURE = 'Feature'
const DATE = 'Date'
const PORTRAIT_IMAGE = 'Portrait Image'
const LANDSCAPE_IMAGE = 'Landscape Image'

export const filterRawArticles = (rawArticle: GoogleSpreadsheetRow): GoogleSpreadsheetRow =>
  rawArticle.get(ID) &&
  rawArticle.get(TITLE) &&
  rawArticle.get(AUTHOR) &&
  rawArticle.get(DESCRIPTION) &&
  rawArticle.get(TEXT) &&
  rawArticle.get(DATE)

export const mapRawArticles = (rawArticle: GoogleSpreadsheetRow): Article => ({
  id: rawArticle.get(ID),
  title: rawArticle.get(TITLE),
  author: rawArticle.get(AUTHOR),
  description: rawArticle.get(DESCRIPTION),
  text: rawArticle.get(TEXT),
  spotlight: !!rawArticle.get(SPOTLIGHT),
  feature: !!rawArticle.get(FEATURE),
  updatedAt: rawArticle.get(DATE),
  portraitImage: rawArticle.get(PORTRAIT_IMAGE) ?? null,
  landscapeImage: rawArticle.get(LANDSCAPE_IMAGE) ?? null,
})

export const asArticleTile = (article: Article): ArticleTile => {
  const { text: _text, ...rest } = article
  return { ...rest }
} 