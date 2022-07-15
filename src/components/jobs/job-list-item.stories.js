import JobListItem from './job-list-item.vue';

const config = {
  title: 'Components/Jobs/Job List Item',
  component: JobListItem
};
export default config;

const Template = (args) => ({
  components: { JobListItem },
  setup() {
    return { args };
  },
  template: '<JobListItem v-bind="args" />'
});

export const Running = Template.bind({});
Running.args = {
  job: {
    name: 'Running Job',
    lastRun: new Date(2022, 3, 4, 8, 0, 0, 0),
    status: 'active'
  }
};

export const Waiting = Template.bind({});
Waiting.args = {
  job: {
    name: 'Waiting Job',
    lastRun: new Date(2022, 3, 4, 12, 0, 0, 0),
    status: 'waiting'
  }
};

export const Stopped = Template.bind({});
Stopped.args = {
  job: {
    name: 'Stopped Job',
    lastRun: new Date(2022, 3, 4, 5, 0, 0, 0),
    status: 'done'
  }
};

export const Error = Template.bind({});
Error.args = {
  job: {
    name: 'Errored Job',
    status: 'error'
  }
};
