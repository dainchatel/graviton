/* eslint-disable @typescript-eslint/no-explicit-any */
export const createMockGoogleRow = (fields: Record<string, any>) => ({
  get: (key: string) => fields[key],
})

export const mockGoogleStays = [
  createMockGoogleRow({
    Name: 'Tokyo Tower Hotel',
    Location: 'Tokyo',
    Description: 'Great hotel near Tokyo Tower.',
    Type: 'Hotel',
    Coordinates: '35.6586, 139.7454',
    Address: '4-2-8 Shibakoen, Minato City, Tokyo',
    Price: '$$$',
    Image: 'tokyo_tower_image',
    Tags: 'landmark view,luxury',
    Link: 'https://tokyo-tower-hotel.example.com',
    Score: '4.8',
  }),
]

export const mockGoogleArticles = [
  createMockGoogleRow({
    Title: 'Exploring Hidden Tokyo',
    Author: 'Jem Doe',
    Text: 'Discover Tokyo\'s hidden neighborhoods.',
    Image: 'tokyo_hidden_image',
    Tags: 'Tokyo,Hidden Gems',
    Header: true,
    Subheader: false,
  }),
]

export const mockGoogleLocations = [
  createMockGoogleRow({
    Name: 'Tokyo',
    Icon: 'Sun',
    UpdatedAt: '2025-04-22',
  }),
]

export const mockGoogleSheets = ({
  stays = [],
  articles = [],
  locations = [],
}: {
  stays?: any[]
  articles?: any[]
  locations?: any[]
}) => ({
  sheetsByTitle: {
    Stays: { getRows: () => stays },
    Articles: { getRows: () => articles },
    Locations: { getRows: () => locations },
  },
})
