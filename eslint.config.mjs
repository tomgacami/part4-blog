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
    rules:{
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true,'after': true }],
      'no-console': 0
    }
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" }
  },
  globalIgnores(['./dist/'])
]);
