import ConnectionStatus from './connection-status.vue';

const config = {
  title: 'Components/Jobs/Connection Status',
  component: ConnectionStatus
};
export default config;

const Template = (args) => ({
  components: { ConnectionStatus },
  setup() {
    return { args };
  },
  template: '<ConnectionStatus v-bind="args" />'
});

export const Active = Template.bind({});
Active.args = { status: 'active' };

export const Done = Template.bind({});
Done.args = { status: 'done' };

export const Waiting = Template.bind({});
Waiting.args = { status: 'waiting' };

export const Delayed = Template.bind({});
Delayed.args = { status: 'delayed' };

export const Error = Template.bind({});
Error.args = { status: 'error' };
