import { themes } from '@storybook/theming';
import { app } from '@storybook/vue3';

import tooltip from '@/directives/tooltip';

import '@/assets/scss/base.scss';

// directives
app.directive('tooltip', tooltip);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  docs: {
    theme: themes.dark
  }
};