export type Stay = {
  id: string
  name: string
  location: string
  description: string
  type: string
  link: string
  coordinates: string
  image?: string
  tags?: string[]
  score?: string
}

export type Article = {
  id: string
  title: string
  author: string
  text: string
  tags: string[]
  image: string
  header: boolean
}

export type Props = {
  stays: Stay[]
  articles: Article[]
}
