const path = require('path');

const { mergeConfig } = require('vite');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-css-user-preferences'
  ],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite'
  },
  async viteFinal(config, _) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          node_modules: path.resolve(__dirname, '../node_modules')
        }
      }
    });
  }
};
