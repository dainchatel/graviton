import { fetchData } from '@/graviton/lib/data'

describe('fetchData', () => {
  jest.setTimeout(10_000)
  it('fetches and transforms data from Google Sheets', async () => {
    const { stays, articles } = await fetchData()

    expect(Array.isArray(stays)).toBe(true)
    expect(Array.isArray(articles)).toBe(true)

    expect(stays.length).toBeGreaterThan(2)
    expect(articles.length).toBeGreaterThan(2)

    const firstStay = stays[0]
    expect(firstStay).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
    }))

    const firstArticle = articles[0]
    expect(firstArticle).toStrictEqual(expect.objectContaining({
      id: expect.any(String),
      title: expect.any(String),
      text: expect.any(String),
      author: expect.any(String),
    }))
  })
})