import globals from "globals"
import js from "@eslint/js"
import stylisticJs from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs", 
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    }, 
    plugins: {
      '@stylistic': stylisticJs,
    }, 
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      //TODO: more 
    },
  },
  {
    ignores: ['dist/**'],
  }
]
