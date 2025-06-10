import js from "@eslint/js";
import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin";


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
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off', 
    },
  },
  {
    ignores: ['dist/**'],
  }
]