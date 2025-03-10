import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginTypescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,ts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  // TypeScript configuration
  {
    files: ['**/*.{ts,tsx,vue}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
      }
    },
    plugins: {
      '@typescript-eslint': pluginTypescript
    },
    rules: {
      ...pluginTypescript.configs.recommended.rules
    }
  },

  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  }
]
