module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    config: true,
    jsdom: true,
    IS_SERVER: true,
    gertcha: true
  },
  parser: 'babel-eslint',
  plugins: [
    // 'prettier',
    'react',
    'eslint-plugin-react'
  ],
  rules: {
    // 'prettier/prettier': 'error',
    // 'prettier.jsxBracketSameLine': 0,
    quotes: [2, 'single', { avoidEscape: true }],
    'react/prop-types': 0
  }
};
