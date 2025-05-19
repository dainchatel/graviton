/* eslint-disable @typescript-eslint/no-explicit-any */
export const createMockGoogleRow = (fields: Record<string, any>) => ({
  get: (key: string) => fields[key],
})

export const mockGoogleStays = [
  createMockGoogleRow({
    ID: 'tokyo-tower',
    Name: 'Tokyo Tower Hotel',
    Location: 'Tokyo',
    Coordinates: '35.6586, 139.7454',
    Address: '4-2-8 Shibakoen, Minato City, Tokyo',
    Type: 'Hotel',
    Price: '$$$',
    Description: 'Great hotel near Tokyo Tower.',
    Link: 'https://tokyo-tower-hotel.example.com',
    'Instagram Embed': 'tokyo_tower_image',
  }),
]

export const mockGoogleArticles = [
  createMockGoogleRow({
    ID: 'hidden-tokyo',
    Title: 'Exploring Hidden Tokyo',
    Author: 'Jem Doe',
    Description: 'Discover Tokyo\'s hidden neighborhoods.',
    Text: 'Discover Tokyo\'s hidden neighborhoods.',
    'Landscape Image': 'tokyo_hidden_image',
    'Portrait Image': 'tokyo_hidden_image',
    Spotlight: true,
    Date: '02/24/2025',
  }),
]

export const mockGoogleLocations = [
  createMockGoogleRow({
    ID: 'tokyo',
    Name: 'Tokyo',
    Icon: 'Sun',
    Description: 'A megacity with amazing food, wine, and music.',
    Dropdown: true,
    Date: '12/20/2024',
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
