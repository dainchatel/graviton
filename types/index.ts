export type Stay = {
  id: string
  name: string
  location: string
  description: string
  type: string
  link: string
  address: string
  price: string
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
  subHeader: boolean
}

export type Location = {
  id: string
  name: string
  icon: string
  numberOfStays: number
  updatedAt?: string
}

export type Home = {
  header: Article
  subHeaders: Article[]
  updatedLocations: Location[]
}

export type Props = {
  stays: Stay[]
  articles: Article[]
  locations: Location[]
  home: Home
}
