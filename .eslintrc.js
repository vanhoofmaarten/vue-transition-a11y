module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    project: ['./tsconfig.base.json'],
  },
};
