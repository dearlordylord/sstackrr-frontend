module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/extensions': 'off',
    'no-unused-vars': 'off', // @typescript-eslint/no-unused-vars is used instead
    '@typescript-eslint/no-unused-vars': 'error',
    'no-shadow': 'off', // @typescript-eslint/no-shadow is used instead
    '@typescript-eslint/no-shadow': 'error',
    'react/require-default-props': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'max-len': 'off', // @typescript-eslint/max-len is used instead
    'jsx-a11y/control-has-associated-label': 'off', // not here
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-nested-ternary": "off"
  },
  "overrides": [
    {
      "files": [
        "**/*.spec.js",
        "**/*.spec.jsx"
      ],
      "env": {
        "jest": true
      }
    }
  ]
};
