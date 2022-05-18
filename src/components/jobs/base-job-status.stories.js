import BaseJobStatus from './base-job-status.vue';

const config = {
  component: BaseJobStatus
};
export default config;

const Template = (args) => ({
  components: { BaseJobStatus },
  setup() {
    return { args };
  },
  template: '<BaseJobStatus v-bind="args" />'
});

export const Default = Template.bind({});
Default.args = {};

export const Running = Template.bind({});
Running.args = { state: 'running' };

export const Waiting = Template.bind({});
Waiting.args = { state: 'waiting' };

export const Stopped = Template.bind({});
Stopped.args = { state: 'stopped' };

export const Error = Template.bind({});
Error.args = { state: 'error' };
