import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import perfectionist from 'eslint-plugin-perfectionist';
import globals from 'globals';

export default [
  {
    ignores: ['dist', 'node_modules', 'build', '.git'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
        process: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      perfectionist,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // React specific rules
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'warn',
      'react/jsx-key': 'error',

      // General JavaScript rules
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^React$',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-console': 'warn',
      'no-debugger': 'warn',

      // React Refresh rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Perfectionist rules
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'unknown',
          ],
          customGroups: [
            { groupName: 'react', elementNamePattern: '^(react|react-dom)$' },
            { groupName: 'react-router', elementNamePattern: '^react-router-dom$' },
            { groupName: 'react-hooks', elementNamePattern: '^react-hook-form$' },
            { groupName: 'react-ui', elementNamePattern: '^(react-hot-toast|lucide-react)$' },
            { groupName: 'react-charts', elementNamePattern: '^(react-chartjs-2|recharts|chart.js)$' },
            { groupName: 'utils', elementNamePattern: '^(date-fns|axios|exif-js|tesseract.js)$' },
          ],
          internalPattern: ['^@/'],
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-enums': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-array-includes': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
    },
  },
  // Test files configuration
  {
    files: ['**/__tests__/**/*', '**/*.{test,spec}.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
