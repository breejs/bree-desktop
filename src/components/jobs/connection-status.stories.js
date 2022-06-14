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

export const Running = Template.bind({});
Running.args = { status: 'running' };

export const Waiting = Template.bind({});
Waiting.args = { status: 'waiting' };

export const Stopped = Template.bind({});
Stopped.args = { status: 'stopped' };

export const Error = Template.bind({});
Error.args = { status: 'error' };
