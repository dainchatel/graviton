import { useAppState } from './_app'
import { Article } from '../types'
import Layout from '@/graviton/components/layout'

export default function Articles() {
  const { articles } = useAppState()
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <ul>
        {articles.map(({ title, author, text, tags }: Article) => (
          <li key={title}>
            <strong>{title}</strong>
            <br />
            {author}
            <br />
            {text}
            <br />
            {tags}
            <br />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

