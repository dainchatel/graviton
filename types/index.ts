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
  instagramEmbed: string | null
}

export type Article = {
  id: string
  title: string
  author: string
  description: string
  text: string
  spotlight: boolean
  feature: boolean
  updatedAt: string
  locations: string[]
  landscapeImage: string | null
  portraitImage: string | null
}

export type ArticleTile = Omit<Article, 'text'>

export type Location = {
  id: string
  name: string
  icon: string
  description: string
  dropdown: boolean
  updatedAt: string
  numberOfStays: number
  landscapeImage: string | null
  portraitImage: string | null
}

export type LocationTile = Omit<Location, 'description'>

export type DropdownLocation = Pick<Location, 'id' | 'name'>

export type Props = {
  stays: Stay[]
  articles: Article[]
  locations: Location[]
  dropdownLocations: DropdownLocation[]
}
