import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  // ESLint recommended rules
  eslint.configs.recommended,
  // TypeScript recommended rules
  ...tseslint.configs.recommended,
  // Prettier (disables rules that conflict with Prettier)
  prettier,

  {
    languageOptions: {
      parser: tsParser,

      globals: {
        ...globals.node,
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
  },
];
