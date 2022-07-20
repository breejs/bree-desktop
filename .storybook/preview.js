import '@/assets/scss/base.scss';
// eslint-disable-next-line import/no-unassigned-import
import 'bootstrap';

import { themes } from '@storybook/theming';
import { app } from '@storybook/vue3';
import { createPinia } from 'pinia';

import tooltip from '@/directives/tooltip';
import { breeRestart, breeStop, breeStart, removeConnection } from '@/symbols';

// directives
app.directive('tooltip', tooltip);

// pinia
const pinia = createPinia();
app.use(pinia);

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

export const decorators = [
  (story) => ({
    template: `<story/>`,
    components: { story },
    provide: {
      [breeRestart]() {},
      [breeStop]() {},
      [breeStart]() {},
      [removeConnection]() {}
    },
    directives: {
      tooltip
    }
  })
];
