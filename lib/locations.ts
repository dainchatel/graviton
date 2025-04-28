import { randomUUID } from 'crypto'
import { Location } from '@/graviton/types'
import { GoogleSpreadsheetRow } from 'google-spreadsheet'

const NAME = 'Name'
const ICON = 'Icon'
const DATE = 'Date'

export const filterRawLocations = (rawStay: GoogleSpreadsheetRow): GoogleSpreadsheetRow =>
  rawStay.get(NAME) &&
  rawStay.get(ICON)

export const mapRawLocations = (rawLocation: GoogleSpreadsheetRow): Omit<Location, 'numberOfStays'> => ({
  id: randomUUID(),
  name: rawLocation.get(NAME),
  icon: rawLocation.get(ICON),
  updatedAt: rawLocation.get(DATE) ?? null,
})