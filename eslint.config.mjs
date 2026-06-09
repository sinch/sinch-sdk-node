import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import jest from 'eslint-plugin-jest';
import jestExtended from 'eslint-plugin-jest-extended';
import jestFormatting from 'eslint-plugin-jest-formatting';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // eslint-config-prettier comes before the custom rules so the explicit style
  // rules below take precedence (mirroring the previous .eslintrc ordering).
  prettier,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      // The SDK models expose generated request-data/marker interfaces that are
      // intentionally empty (or only extend a single supertype) for API consistency.
      '@typescript-eslint/no-empty-object-type': 'off',
      'semi': 'warn',
      'comma-dangle': 'warn',
      'quotes': ['warn', 'single'],
      'curly': ['error', 'all'],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'object-curly-spacing': ['error', 'always', { objectsInObjects: true, arraysInObjects: true }],
      'operator-linebreak': ['error', 'before'],
      'max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
          ignoreComments: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignorePattern: '^import.+|test',
        },
      ],
      'new-cap': 'off',
    },
  },
  {
    files: ['**/tests/**/*.ts', '**/*.test.ts', '**/*.spec.ts'],
    plugins: {
      jest,
      'jest-extended': jestExtended,
      'jest-formatting': jestFormatting,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/expect-expect': 'error',
      'jest-extended/prefer-to-be-true': 'warn',
      'jest-extended/prefer-to-be-false': 'error',
      'jest-formatting/padding-around-describe-blocks': 2,
      'jest-formatting/padding-around-test-blocks': 2,
    },
  },
);
