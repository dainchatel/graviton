import { randomUUID } from 'crypto'
import { Article } from '@/graviton/types'
import { GoogleSpreadsheetRow } from 'google-spreadsheet'

const TITLE = 'Title'
const AUTHOR = 'Author'
const TEXT = 'Text'
const IMAGE = 'Image'
const TAGS = 'Tags'
const HEADER = 'Header'

export const filterRawArticles = (rawStay: GoogleSpreadsheetRow): GoogleSpreadsheetRow =>
  rawStay.get(TITLE) &&
  rawStay.get(AUTHOR) &&
  rawStay.get(TEXT)

export const mapRawArticles = (rawArticle: GoogleSpreadsheetRow): Article => ({
  id: randomUUID(),
  title: rawArticle.get(TITLE),
  author: rawArticle.get(AUTHOR),
  text: rawArticle.get(TEXT),
  image: rawArticle.get(IMAGE),
  tags: rawArticle.get(TAGS) ? rawArticle.get(TAGS).split(',') : [],
  header: !!rawArticle.get(HEADER),
})