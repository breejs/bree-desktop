import JobInfo from './job-info.vue';

const config = {
  component: JobInfo
};
export default config;

const Template = (args) => ({
  components: { JobInfo },
  setup() {
    return { args };
  },
  template: '<JobInfo v-bind="args" />'
});

export const WithLastRun = Template.bind({});
WithLastRun.args = {
  name: 'Job Name',
  lastRun: new Date(2022, 3, 4, 12, 0, 0, 0)
};

export const WithNoLastRun = Template.bind({});
WithNoLastRun.args = {
  name: 'Job Name'
};
