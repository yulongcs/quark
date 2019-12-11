module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'react-app', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
    extraFileExtensions: ['tsx'],
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/ban-ts-ignore': ['off'],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/interface-name-prefix': ['error', 'always'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    'import/no-cycle': ['off'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts', 'src/setupTests.ts'] }],
    'import/prefer-default-export': ['off'],
    'jsx-a11y/anchor-is-valid': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/no-noninteractive-element-interactions': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'linebreak-style': 'off',
    'max-len': ['error', 200],
    'no-console': ['off'],
    'no-restricted-imports': [
      'error',
      {
        paths: [{
          name: 'styled-components',
          message: 'Please import from styled-components/macro.',
        }],
        patterns: [
          '!styled-components/macro',
        ],
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['ts', 'tsx'] }],
    'react/jsx-props-no-spreading': ['off'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
        ],
        extensions: ['.ts', '.tsx', '.json', '.js'],
      },
    },
    'import/extensions': ['.ts', '.tsx', '.js'],
  },
};
