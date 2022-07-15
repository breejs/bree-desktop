import JobList from './job-list.vue';

const config = {
  title: 'Components/Jobs/Job List',
  component: JobList
};
export default config;

const Template = (args) => ({
  components: { JobList },
  setup() {
    return { args };
  },
  template: '<JobList v-bind="args" />'
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
      status: 'done'
    },
    {
      name: 'Errored Job',
      status: 'error'
    },
    {
      name: 'Running Job',
      lastRun: new Date(2022, 3, 4, 8, 0, 0, 0),
      status: 'active'
    }
  ]
};
