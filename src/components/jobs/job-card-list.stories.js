import JobCardList from './job-card-list.vue';

const config = {
  component: JobCardList
};
export default config;

const Template = (args) => ({
  components: { JobCardList },
  setup() {
    return { args };
  },
  template: '<JobCardList v-bind="args" />'
});

export const NoJobs = Template.bind({});
NoJobs.args = { jobs: [] };

export const Jobs = Template.bind({});
Jobs.args = {
  jobs: [
    {
      name: 'Waiting Job',
      lastRun: new Date(2022, 3, 4, 12, 0, 0, 0),
      status: 'waiting'
    },
    {
      name: 'Stopped Job',
      lastRun: new Date(2022, 3, 4, 5, 0, 0, 0),
      status: 'stopped'
    },
    {
      name: 'Errored Job',
      status: 'error'
    },
    {
      name: 'Running Job',
      lastRun: new Date(2022, 3, 4, 8, 0, 0, 0),
      status: 'running'
    }
  ]
};
