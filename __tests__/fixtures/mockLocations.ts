import { asDropdownLocation, asLocationTile } from '@/graviton/lib/locations'
import { Location } from '@/graviton/types'

export const mockLocations: Location[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    icon: 'Sun',
    updatedAt: '2025-04-22',
    numberOfStays: 12,
    description: '',
    dropdown: true,
    portraitImage: null,
    landscapeImage: null,
  },
  {
    id: 'berlin',
    name: 'Berlin',
    icon: 'Building2',
    updatedAt: '2025-04-20',
    numberOfStays: 11,
    description: '',
    dropdown: true,
    portraitImage: null,
    landscapeImage: null,
  },
  {
    id: 'lisbon',
    name: 'Lisbon',
    icon: 'Waves',
    updatedAt: '2025-04-18',
    numberOfStays: 10,
    description: '',
    dropdown: true,
    portraitImage: null,
    landscapeImage: null,
  },
  {
    id: 'miami',
    name: 'Miami',
    icon: 'TreePalm',
    updatedAt: '2025-04-02',
    numberOfStays: 13,
    description: '',
    dropdown: true,
    portraitImage: null,
    landscapeImage: null,
  },
]

export const mockDropdownLocations = mockLocations
  .filter(location => location.dropdown)
  .map(asDropdownLocation)

export const mockLocationTiles = mockLocations
  .map(asLocationTile)
