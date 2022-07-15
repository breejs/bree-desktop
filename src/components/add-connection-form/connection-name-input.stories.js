import ConnectionNameInput from './connection-name-input.vue';

const config = {
  title: 'Components/Add Connection Form/Connection Name Input',
  component: ConnectionNameInput
};
export default config;

const Template = (args) => ({
  components: { ConnectionNameInput },
  setup() {
    return { args };
  },
  template: '<form novalidate><ConnectionNameInput v-bind="args" /></form>'
});

export const Default = Template.bind({});

export const Valid = Template.bind({});
Valid.args = {
  value: 'valid',
  connectionNames: ['invalid']
};

export const Invalid = Template.bind({});
Invalid.args = { value: 'invalid', connectionNames: ['invalid'] };
