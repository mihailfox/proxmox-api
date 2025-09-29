module.exports = {
  root: true,
  ignorePatterns: ['node_modules/', 'dist/', 'coverage/', 'playwright-report/', 'test-results/', 'blob-report/'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  env: {
    node: true,
    es2021: true
  },
  overrides: [
    {
      files: ['tools/api-scraper/tests/**/*.ts'],
      env: {
        browser: true
      }
    }
  ]
};
