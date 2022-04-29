// eslint-config-xo is used in xo-lass
const xoConfigRules = require('eslint-config-xo').rules;

module.exports = {
  prettier: true,
  space: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-prettier',
    'xo-lass'
  ],
  envs: ['vue/setup-compiler-macros'],
  extensions: ['js', 'cjs', 'mjs', 'vue'],
  rules: {
    'node/file-extension-in-import': 'off',

    // xo extensions
    'vue/array-bracket-newline': xoConfigRules['array-bracket-newline'],
    'vue/array-bracket-spacing': xoConfigRules['array-bracket-spacing'],
    'vue/arrow-spacing': xoConfigRules['arrow-spacing'],
    'vue/block-spacing': xoConfigRules['block-spacing'],
    'vue/brace-style': xoConfigRules['brace-style'],
    'vue/camelcase': xoConfigRules['camelcase'],
    'vue/comma-dangle': xoConfigRules['comma-dangle'],
    'vue/comma-spacing': xoConfigRules['comma-spacing'],
    'vue/comma-style': xoConfigRules['comma-style'],
    'vue/dot-location': xoConfigRules['dot-location'],
    'vue/dot-notation': xoConfigRules['dot-notation'],
    'vue/eqeqeq': xoConfigRules['eqeqeq'],
    'vue/func-call-spacing': xoConfigRules['func-call-spacing'],
    'vue/key-spacing': xoConfigRules['key-spacing'],
    'vue/keyword-spacing': xoConfigRules['keyword-spacing'],
    'vue/max-len': xoConfigRules['max-len'],
    'vue/no-constant-condition': xoConfigRules['no-constant-condition'],
    'vue/no-empty-pattern': xoConfigRules['no-empty-pattern'],
    'vue/no-extra-parens': xoConfigRules['no-extra-parens'],
    'vue/no-irregular-whitespace': xoConfigRules['no-irregular-whitespace'],
    'vue/no-loss-of-precision': xoConfigRules['no-loss-of-precision'],
    'vue/no-restricted-syntax': xoConfigRules['no-restricted-syntax'],
    'vue/no-sparse-arrays': xoConfigRules['no-sparse-arrays'],
    'vue/no-useless-concat': xoConfigRules['no-useless-concat'],
    'vue/object-curly-newline': xoConfigRules['object-curly-newline'],
    'vue/object-curly-spacing': xoConfigRules['object-curly-spacing'],
    'vue/object-property-newline': xoConfigRules['object-property-newline'],
    'vue/object-shorthand': xoConfigRules['object-shorthand'],
    'vue/operator-linebreak': xoConfigRules['operator-linebreak'],
    'vue/prefer-template': xoConfigRules['prefer-template'],
    'vue/quote-props': xoConfigRules['quote-props'],
    'vue/space-in-parens': xoConfigRules['space-in-parens'],
    'vue/space-infix-ops': xoConfigRules['space-infix-ops'],
    'vue/space-unary-ops': xoConfigRules['space-unary-ops'],
    'vue/template-curly-spacing': xoConfigRules['template-curly-spacing']
  }
};
