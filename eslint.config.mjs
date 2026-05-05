import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, stylistic },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node }
  },
  {
    rules: {
      'eqeqeq': 'error',
      //'no-trailing-spaces': 'error',   ///Esta regla no permite espacios al final de una linea, pero quita los espacios al inicio tambien
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 0,
      'space-infix-ops': 'error',
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'switch-colon-spacing': ['error', { after: true, before: false }],
      'comma-spacing': ['error', { before: false, after: true }],
      'semi-spacing': ['error', { before: false, after: true }],
    }
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" }
  },
  globalIgnores(['./dist/'])
]);
