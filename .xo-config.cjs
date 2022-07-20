// eslint-config-xo is used in xo-lass
const xoConfigRules = require('eslint-config-xo').rules;

module.exports = {
  prettier: true,
  space: true,
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-prettier',
    'xo-lass'
  ],
  envs: ['vue/setup-compiler-macros'],
  extensions: ['js', 'cjs', 'mjs', 'vue'],
  ignores: ['dist*/**'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  rules: {
    'n/file-extension-in-import': 'off',

    // xo extensions
    'vue/array-bracket-newline': xoConfigRules['array-bracket-newline'],
    'vue/array-bracket-spacing': xoConfigRules['array-bracket-spacing'],
    'vue/arrow-spacing': xoConfigRules['arrow-spacing'],
    'vue/brace-style': xoConfigRules['brace-style'],
    'vue/camelcase': xoConfigRules.camelcase,
    'vue/comma-dangle': xoConfigRules['comma-dangle'],
    'vue/comma-spacing': xoConfigRules['comma-spacing'],
    'vue/comma-style': xoConfigRules['comma-style'],
    'vue/dot-location': xoConfigRules['dot-location'],
    'vue/dot-notation': xoConfigRules['dot-notation'],
    'vue/eqeqeq': xoConfigRules.eqeqeq,
    'vue/func-call-spacing': xoConfigRules['func-call-spacing'],
    'vue/key-spacing': xoConfigRules['key-spacing'],
    'vue/keyword-spacing': xoConfigRules['keyword-spacing'],
    'vue/no-constant-condition': xoConfigRules['no-constant-condition'],
    'vue/no-empty-pattern': xoConfigRules['no-empty-pattern'],
    'vue/no-irregular-whitespace': xoConfigRules['no-irregular-whitespace'],
    'vue/no-loss-of-precision': xoConfigRules['no-loss-of-precision'],
    'vue/no-sparse-arrays': xoConfigRules['no-sparse-arrays'],
    'vue/no-useless-concat': xoConfigRules['no-useless-concat'],
    'vue/object-curly-spacing': xoConfigRules['object-curly-spacing'],
    'vue/object-shorthand': xoConfigRules['object-shorthand'],
    'vue/operator-linebreak': xoConfigRules['operator-linebreak'],
    'vue/quote-props': xoConfigRules['quote-props'],
    'vue/space-in-parens': xoConfigRules['space-in-parens'],
    'vue/space-infix-ops': xoConfigRules['space-infix-ops'],
    'vue/space-unary-ops': xoConfigRules['space-unary-ops'],
    'vue/template-curly-spacing': xoConfigRules['template-curly-spacing']
  },
  overrides: [
    {
      files: '**/*.vue',
      rules: {
        'no-unused-vars': 'off'
      }
    },
    {
      files: 'src-node/jobs/**/*.js',
      rules: {
        'unicorn/no-process-exit': 'off'
      }
    },
    {
      files: 'test/**/*.js',
      extends: ['eslint-config-vitest-globals'],
      rules: {
        'max-nested-callbacks': 'off'
      }
    },
    {
      files: 'test/**/jobs/**/*.js',
      rules: {
        'unicorn/no-process-exit': 'off'
      }
    }
  ]
};
