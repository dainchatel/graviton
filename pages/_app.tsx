import type { AppProps } from 'next/app'
import { createContext, useContext, useState } from 'react'
import { Article, Stay } from '../types'

interface AppState {
  stays: Stay[]
  articles: Article[]
  setStays: (stays: Stay[]) => void
  setArticles: (articles: Article[]) => void
}

export const AppContext = createContext<AppState | null>(null)

export function useAppState() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppState must be used within AppProvider')
  }
  return context
}

export default function App({ Component, pageProps }: AppProps) {
  const [stays, setStays] = useState<Stay[]>([])
  const [articles, setArticles] = useState<Article[]>([])

  // Initialize state when data is available from getServerSideProps
  if (pageProps.stays && stays.length === 0) {
    setStays(pageProps.stays)
  }
  if (pageProps.articles && articles.length === 0) {
    setArticles(pageProps.articles)
  }

  return (
    <AppContext.Provider value={{ stays, articles, setStays, setArticles }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}