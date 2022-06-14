import vueRouter from 'storybook-vue3-router';

import App from './app.vue';
import { routes } from '@/router';

const config = {
  title: 'Layouts/Main Layout',
  components: App
};
export default config;

const Template = (args) => ({
  components: { App },
  setup() {
    return { args };
  },
  template: '<App v-bind="args" />'
});

export const Default = Template.bind({});
Default.decorators = [vueRouter(routes, { initialRoute: '/' })];
