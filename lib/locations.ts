import { Location, DropdownLocation, LocationTile } from '@/graviton/types'
import { GoogleSpreadsheetRow } from 'google-spreadsheet'

const ID = 'ID'
const NAME = 'Name'
const ICON = 'Icon'
const DESCRIPTION = 'Description'
const DROPDOWN = 'Dropdown'
const DATE = 'Date'
const LANDSCAPE_IMAGE = 'Landscape Image'
const PORTRAIT_IMAGE = 'Portrait Image'

export const filterRawLocations = (rawStay: GoogleSpreadsheetRow): GoogleSpreadsheetRow =>
  rawStay.get(ID) &&
  rawStay.get(NAME) &&
  rawStay.get(ICON) &&
  rawStay.get(DESCRIPTION) &&
  rawStay.get(DATE)

export const mapRawLocations = (rawLocation: GoogleSpreadsheetRow): Omit<Location, 'numberOfStays'> => ({
  id: rawLocation.get(ID),
  name: rawLocation.get(NAME),
  icon: rawLocation.get(ICON),
  description: rawLocation.get(DESCRIPTION),
  dropdown: !!rawLocation.get(DROPDOWN),
  updatedAt: rawLocation.get(DATE),
  landscapeImage: rawLocation.get(LANDSCAPE_IMAGE) ?? null,
  portraitImage: rawLocation.get(PORTRAIT_IMAGE) ?? null,
})

export const asLocationTile = (location: Location): LocationTile => {
  const { description: _description, ...rest } = location
  return { ...rest }
}

export const asDropdownLocation = ({ id, name }: Location): DropdownLocation => ({
  id,
  name,
})
  