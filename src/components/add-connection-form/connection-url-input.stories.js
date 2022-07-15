import ConnectionUrlInput from './connection-url-input.vue';

const config = {
  title: 'Components/Add Connection Form/Connection Url Input',
  component: ConnectionUrlInput
};
export default config;

const Template = (args) => ({
  components: { ConnectionUrlInput },
  setup() {
    return { args };
  },
  template: '<form novalidate><ConnectionUrlInput v-bind="args" /></form>'
});

export const Default = Template.bind({});

export const Valid = Template.bind({});
Valid.args = { value: 'https://localhost:68' };

export const Invalid = Template.bind({});
Invalid.args = { value: 'localhost' };
