import {RuleTester} from '@typescript-eslint/experimental-utils/dist//ts-eslint/RuleTester';


export const ruleTester = new RuleTester({
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
      ecmaFeatures: {},
    },
    parser: '@typescript-eslint/parser',
});
