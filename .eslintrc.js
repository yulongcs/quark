module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'react-app', 'airbnb', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    useJSXTextNode: true,
    extraFileExtensions: ['tsx'],
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/interface-name-prefix': ['error', 'always'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    'comma-dangle': ['error', 'never'],
    'import/no-cycle': ['off'],
    'import/prefer-default-export': ['off'],
    'jsx-a11y/anchor-is-valid': ['off'],
    'linebreak-style': ['off', 'error', 'windows'],
    'max-len': ['error', 200],
    'no-console': ['off'],
    'no-constant-condition': ['off'],
    'react/jsx-filename-extension': ['error', { extensions: ['ts', 'tsx'] }]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.ts', '.tsx', '.json', '.js'
        ]
      }
    },
    'import/extensions': ['.ts', '.tsx', '.js']
  }
};
