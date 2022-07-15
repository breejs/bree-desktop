import ConnectionListItem from './connection-list-item.vue';

const config = {
  title: 'Components/Jobs/Connection List Item',
  component: ConnectionListItem
};
export default config;

const Template = (args) => ({
  components: { ConnectionListItem },
  setup() {
    return { args };
  },
  template: '<ConnectionListItem v-bind="args" />'
});

export const Running = Template.bind({});
Running.args = {
  connection: {
    name: 'Running Connection',
    lastPing: new Date(2022, 3, 4, 8, 0, 0, 0),
    status: 'active',
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
  }
};

export const Stopped = Template.bind({});
Stopped.args = {
  connection: {
    name: 'Stopped Connection',
    lastPing: new Date(2022, 3, 4, 5, 0, 0, 0),
    status: 'done',
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
  }
};
