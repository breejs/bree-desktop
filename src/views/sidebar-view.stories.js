import vueRouter from 'storybook-vue3-router';

import SidebarView from './sidebar-view.vue';
import { routes } from '@/router';

const config = {
  title: 'Views/Sidebar View',
  component: SidebarView,
  parameters: {
    docs: {
      inlineStories: false,
      description: {
        component: 'The main sidebar view'
      }
    }
  }
};
export default config;

const Template = (args) => ({
  components: { SidebarView },
  setup() {
    return { args };
  },
  template: '<SidebarView v-bind="args" />'
});

export const Light = Template.bind({});
Light.decorators = [vueRouter(routes, { initialRoute: '/' })];
Light.parameters = {
  cssUserPrefs: {
    'prefers-color-scheme': 'light'
  }
};

export const Dark = Template.bind({});
Dark.decorators = [vueRouter(routes, { initialRoute: '/' })];
Dark.parameters = {
  cssUserPrefs: {
    'prefers-color-scheme': 'dark'
  }
};
