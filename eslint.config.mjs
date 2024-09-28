// eslint.config.mjs
import antfu from '@antfu/eslint-config'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default antfu(
  {
    react: {
      overrides: {
        'style/jsx-max-props-per-line': ['error', { maximum: 3, when: 'multiline' }],
      },
    },
    jsx: true,
    typescript: true,
    ignores: [
      '**/*.gen.ts',
    ],
  },
  ...pluginQuery.configs['flat/recommended'],
)
