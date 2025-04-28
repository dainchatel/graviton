jest.mock('@/graviton/lib/google', () => ({
  fetchFromGoogleAPI: jest.fn(),
}))

import { fetchData } from '@/graviton/lib'
import { fetchFromGoogleAPI } from '@/graviton/lib/google'
import { 
  mockArticles, 
  mockStays, 
  mockGoogleSheets, 
  mockGoogleStays, 
  mockGoogleArticles, 
  mockGoogleLocations, 
} from './fixtures'

describe('fetchData', () => {
  afterEach(() => {
    jest.resetAllMocks()
    delete process.env.MOCK
  })

  it('loads mock data if MOCK env is set', async () => {
    process.env.MOCK = 'true'

    const result = await fetchData()

    expect(result.stays).toEqual(mockStays)
    expect(result.articles).toEqual(mockArticles)
    expect(result.locations.length).toBeGreaterThan(0)
    expect(result.home.header).toEqual(expect.objectContaining({ header: true }))
    expect(Array.isArray(result.home.subHeaders)).toBe(true)
  })

  it('fetches and processes data from Google API if MOCK env is not set', async () => {
    (fetchFromGoogleAPI as jest.Mock).mockResolvedValue(
      mockGoogleSheets({
        stays: mockGoogleStays,
        articles: mockGoogleArticles,
        locations: mockGoogleLocations,
      }),
    )

    const result = await fetchData()

    expect(fetchFromGoogleAPI).toHaveBeenCalled()
    expect(result.stays.length).toBeGreaterThan(0)
    expect(result.articles.length).toBeGreaterThan(0)
    expect(result.locations.length).toBeGreaterThan(0)
    expect(result.home.header).toBeDefined()
    expect(Array.isArray(result.home.subHeaders)).toBe(true)
  })

  it('throws an error if no header article is found', async () => {
    (fetchFromGoogleAPI as jest.Mock).mockResolvedValue(
      mockGoogleSheets({
        stays: mockGoogleStays,
        articles: [], // no articles => no header
        locations: mockGoogleLocations,
      }),
    )

    await expect(fetchData()).rejects.toThrow('No header article')
  })
})
