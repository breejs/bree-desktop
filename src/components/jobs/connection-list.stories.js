import ConnectionList from './connection-list.vue';

const config = {
  title: 'Components/Jobs/Connection List',
  component: ConnectionList
};
export default config;

const Template = (args) => ({
  components: { ConnectionList },
  setup() {
    return { args };
  },
  template: '<ConnectionList v-bind="args" />'
});

export const NoConnections = Template.bind({});
NoConnections.args = { connections: [] };

export const Connections = Template.bind({});
Connections.args = {
  connections: [
    {
      name: 'Running Connection',
      lastPing: new Date(2022, 3, 4, 8, 0, 0, 0),
      status: 'running',
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
    },
    {
      name: 'Stopped Connection',
      lastPing: new Date(2022, 3, 4, 5, 0, 0, 0),
      status: 'stopped',
      jobs: []
    }
  ]
};
