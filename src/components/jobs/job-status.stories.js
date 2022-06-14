import JobStatus from './job-status.vue';

const config = {
  title: 'Components/Jobs/Job Status',
  component: JobStatus
};
export default config;

const Template = (args) => ({
  components: { JobStatus },
  setup() {
    return { args };
  },
  template: '<JobStatus v-bind="args" />'
});

export const Default = Template.bind({});
Default.args = {};

export const Running = Template.bind({});
Running.args = { status: 'running' };

export const Waiting = Template.bind({});
Waiting.args = { status: 'waiting' };

export const Stopped = Template.bind({});
Stopped.args = { status: 'stopped' };

export const Error = Template.bind({});
Error.args = { status: 'error' };
