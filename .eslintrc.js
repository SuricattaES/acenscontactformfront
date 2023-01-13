module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    semi: ['error', 'always'],
    'object-property-newline': [
      0,
      {
        allowAllPropertiesOnSameLine: true,
      },
    ],
    'array-bracket-newline': [
      'warn',
      {
        multiline: true,
        minItems: 4,
      },
    ],
    'template-curly-spacing': ['warn', 'never'],
    'computed-property-spacing': ['warn', 'never'],
    'object-curly-spacing': ['warn', 'always'],
    quotes: [2, 'single', { avoidEscape: true }],

    // Vue JS
    'vue/no-unused-components': 'warn',

    // Vue HTML
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
          normal: 'any',
          component: 'any',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 3,
        },
      },
    ],
    'vue/html-closing-bracket-newline': [
      'warn',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
    'vue/html-indent': [
      'warn',
      4,
      {
        attribute: 0,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/no-spaces-around-equal-signs-in-attribute': ['warn'],
  },
};
