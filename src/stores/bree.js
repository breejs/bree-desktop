import { defineStore } from 'pinia';
import request from 'superagent';

export const useBreeStore = defineStore({
  id: 'bree',
  state: () => ({
    connections: [
      {
        name: 'localhost',
        url: 'http://localhost:62893',
        status: 'stopped'
      }
    ]
  }),
  getters: {},
  actions: {
    async setup() {
      return Promise.all(
        this.connections.map(async (c) => {
          return Promise.all([this.startSSE(c), this.fetchJobs(c)]);
        })
      );
    },
    async fetchJobs(connection) {
      const res = await request.get(`${connection.url}/v1/jobs`);

      connection.jobs = res.body;
    },
    async restart(connectionName, jobName) {
      const connection = getConnectionFromName(
        this.connections,
        connectionName
      );
      const url = `${connection.url}/v1/restart`;

      if (jobName) {
        const job = getJobFromName(connection, jobName);

        job.status = 'stopped';

        await request.post(`${url}/${jobName}`);
      } else {
        connection.status = 'stopped';
        connection.jobs = connection.jobs.map((j) => {
          j.status = 'stopped';
          return j;
        });

        await request.post(url);

        connection.status = 'running';
      }
    },
    async stop(connectionName, jobName) {
      const connection = getConnectionFromName(
        this.connections,
        connectionName
      );
      const url = `${connection.url}/v1/stop`;

      if (jobName) {
        const job = getJobFromName(connection, jobName);

        await request.post(`${url}/${jobName}`);

        job.status = 'stopped';
      } else {
        await request.post(url);

        connection.jobs = connection.jobs.map((j) => {
          j.status = 'stopped';
          return j;
        });
        connection.status = 'stopped';
      }
    },
    async start(connectionName, jobName) {
      const connection = getConnectionFromName(
        this.connections,
        connectionName
      );
      const url = `${connection.url}/v1/start`;

      if (jobName) {
        await request.post(`${url}/${jobName}`);
      } else {
        await request.post(url);

        connection.status = 'running';
      }
    },
    async startSSE(connection) {
      let url = `${connection.url}/v1/sse`;

      if (connection.token) {
        url += `/${connection.token}`;
      }

      const es = new EventSource(url);
      connection.eventSource = es;

      es.addEventListener('open', async () => {
        await this.fetchJobs(connection);
        connection.status = 'running';
        connection.lastPing = new Date();
      });

      es.addEventListener('ping', () => {
        connection.lastPing = new Date();
      });

      es.addEventListener('close', () => {
        connection.status = 'stopped';
        connection.eventSource = null;
      });

      es.addEventListener('worker created', ({ data }) => {
        const job = getJobFromName(connection, data);

        if (job) {
          job.status = 'running';
          job.lastRun = new Date();
        } else {
          console.error(`Job "${data}" does not exist`);
        }
      });

      es.addEventListener('worker deleted', ({ data }) => {
        const job = getJobFromName(connection, data);

        if (job) {
          job.status = 'waiting';
        } else {
          console.error(`Job "${data}" does not exist`);
        }
      });
    }
  }
});

function getConnectionFromName(connections, name) {
  return connections.find((c) => c.name === name);
}

function getJobFromName(connection, name) {
  return connection.jobs.find((j) => j.name === name);
}
