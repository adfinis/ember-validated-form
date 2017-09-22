module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
    'ember/new-module-imports': 2
  }
};
