import ConnectionTokenInput from './connection-token-input.vue';

const config = {
  title: 'Components/Add Connection Form/Connection Token Input',
  component: ConnectionTokenInput
};
export default config;

const Template = (args) => ({
  components: { ConnectionTokenInput },
  setup() {
    return { args };
  },
  template: '<form novalidate><ConnectionTokenInput v-bind="args" /></form>'
});

export const Default = Template.bind({});

export const Valid = Template.bind({});
Valid.args = {
  value:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ'
};

export const Invalid = Template.bind({});
Invalid.args = { value: 'token' };
