const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    rules: {
      curly: 'off',
    },
  },
  {
    rules: {
      'test/consistent-test-it': 'off',
      'test/prefer-lowercase-title': 'off',
    },
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
    },
  },
)
