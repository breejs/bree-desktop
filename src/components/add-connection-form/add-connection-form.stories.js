import AddConnectionForm from './add-connection-form.vue';

const config = {
  title: 'Components/Add Connection Form/Form',
  component: AddConnectionForm
};
export default config;

const Template = (args) => ({
  components: { AddConnectionForm },
  setup() {
    return { args };
  },
  template: `<AddConnectionForm v-bind="args" />`
});

export const Default = Template.bind({});

export const Valid = Template.bind({});
Valid.args = {
  value: {
    url: 'http://localhost:8080'
  }
};

export const Invalid = Template.bind({});
Invalid.args = {
  value: {
    url: 'localhost'
  }
};
