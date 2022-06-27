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
