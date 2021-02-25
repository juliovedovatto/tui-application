const { NODE_ENV = '' } = process.env

const isEnvProduction = NODE_ENV === 'production'

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'prettier',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  plugins: ['vue'],
  rules: {
    'no-console': isEnvProduction ? 'warn' : 'off',
    'no-debugger': isEnvProduction ? 'warn' : 'off',

    // TYPESCRIPT
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        "allowedNames": ["self"]
      }
    ]
  }
}
