import { Stay } from '@/graviton/types'
import { GoogleSpreadsheetRow } from 'google-spreadsheet'

const ID = 'ID'
const NAME = 'Name'
const LOCATION = 'Location'
const DESCRIPTION = 'Description'
const TYPE = 'Type'
const COORDINATES = 'Coordinates'
const INSTAGRAM_EMBED = 'Instagram Embed'
const LINK = 'Link'
const PRICE = 'Price'
const ADDRESS = 'Address'

export const filterRawStays = (rawStay: GoogleSpreadsheetRow): GoogleSpreadsheetRow =>
  rawStay.get(ID) &&
  rawStay.get(NAME) &&
  rawStay.get(LOCATION) &&
  rawStay.get(DESCRIPTION) &&
  rawStay.get(TYPE) &&
  rawStay.get(LINK) &&
  rawStay.get(ADDRESS) &&
  rawStay.get(PRICE)


export const mapRawStays = (rawStay: GoogleSpreadsheetRow): Stay => ({
  id: rawStay.get(ID),
  name: rawStay.get(NAME),
  location: rawStay.get(LOCATION),
  description: rawStay.get(DESCRIPTION),
  type: rawStay.get(TYPE),
  coordinates: rawStay.get(COORDINATES),
  address: rawStay.get(ADDRESS),
  price: rawStay.get(PRICE),
  instagramEmbed: rawStay.get(INSTAGRAM_EMBED) ?? null,
  link: rawStay.get(LINK),
})
