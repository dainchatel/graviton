import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
      'semi': [2, 'never'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'quotes': ['error', 'single'],
      'object-property-newline': ['error', {
        'allowAllPropertiesOnSameLine': true,
      }],
      'object-curly-spacing': ['error', 'always'],
    },
  }),
]

export default eslintConfig
