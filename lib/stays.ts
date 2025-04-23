import { randomUUID } from 'crypto'
import { Stay } from '@/graviton/types'
import { GoogleSpreadsheetRow } from 'google-spreadsheet'

const NAME = 'Name'
const LOCATION = 'Location'
const DESCRIPTION = 'Description'
const TYPE = 'Type'
const COORDINATES = 'Coordinates'
const IMAGE = 'Image'
const TAGS = 'Tags'
const LINK = 'Link'
const SCORE = 'Score'
const PRICE = 'Price'
const ADDRESS = 'Address'

export const filterRawStays = (rawStay: GoogleSpreadsheetRow): GoogleSpreadsheetRow =>
  rawStay.get(NAME) &&
  rawStay.get(LOCATION) &&
  rawStay.get(DESCRIPTION) &&
  rawStay.get(TYPE) &&
  rawStay.get(LINK) &&
  rawStay.get(ADDRESS) &&
  rawStay.get(PRICE)


export const mapRawStays = (rawStay: GoogleSpreadsheetRow): Stay => ({
  id: randomUUID(),
  name: rawStay.get(NAME),
  location: rawStay.get(LOCATION),
  description: rawStay.get(DESCRIPTION),
  type: rawStay.get(TYPE),
  coordinates: rawStay.get(COORDINATES),
  address: rawStay.get(ADDRESS),
  price: rawStay.get(PRICE),
  image: rawStay.get(IMAGE) ?? null,
  tags: rawStay.get(TAGS) ? rawStay.get('Tags').split(',') : [],
  link: rawStay.get(LINK),
  score: rawStay.get(SCORE) ?? null,
})

export type Location = {
  name: string
  latitude: number
  longitude: number
}