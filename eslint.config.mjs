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
    extends: [
      'next/core-web-vitals',
      'next/typescript',
    ],
    plugins: ['react'],
    rules: {
      'semi': [2, 'never'],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'quotes': ['error', 'single'],
      'object-property-newline': ['error', {
        'allowAllPropertiesOnSameLine': true,
      }],
      'object-curly-spacing': ['error', 'always'],
      'react/jsx-curly-newline': ['error', {
        multiline: 'require',
        singleline: 'forbid',
      }],
    },
  }),
]

export default eslintConfig
