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

    // VUE
    'vue/attributes-order': [
      'warn',
      {
        order: [
          /*
            DEFINITION e.g. 'is', 'v-is'
            LIST_RENDERING e.g. 'v-for item in items'
            CONDITIONALS e.g. 'v-if', 'v-else-if', 'v-else', 'v-show', 'v-cloak'
            RENDER_MODIFIERS e.g. 'v-once', 'v-pre'
            GLOBAL e.g. 'id'
            UNIQUE e.g. 'ref', 'key', 'v-slot', 'slot'
            TWO_WAY_BINDING e.g. 'v-model'
            OTHER_DIRECTIVES e.g. 'v-custom-directive'
            OTHER_ATTR e.g. 'custom-prop="foo"', 'v-bind:prop="foo"', ':prop="foo"'
            EVENTS e.g. '@click="functionCall"', 'v-on="event"'
            CONTENT e.g. 'v-text', 'v-html'
          */
          ['DEFINITION', 'UNIQUE', 'GLOBAL'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          ['LIST_RENDERING', 'RENDER_MODIFIERS', 'CONTENT', 'CONDITIONALS']
        ],
        alphabetical: false
      }
    ],

    // TYPESCRIPT
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        "allowedNames": ["self"]
      }
    ],
    '@typescript-eslint/no-unused-vars': 'off'
  }
}
