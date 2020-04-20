module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'config', 'el'],
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_position', '_prev', '_next', '_checked', '_isChecked'],
      },
    ],
    'no-shadow': ['error', { allow: ['state'] }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
