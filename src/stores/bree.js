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
        connection.lastRun = new Date();
      });

      es.addEventListener('close', () => {
        connection.status = 'stopped';
        connection.eventSource = null;
      });

      es.addEventListener('worker created', ({ data }) => {
        const job = connection.jobs.find((j) => j.name === data);

        if (job) {
          job.status = 'running';
          job.lastRun = new Date();
        } else {
          console.error(`Job "${data}" does not exist`);
        }
      });

      es.addEventListener('worker deleted', ({ data }) => {
        const job = connection.jobs.find((j) => j.name === data);

        if (job) {
          job.status = 'waiting';
        } else {
          console.error(`Job "${data}" does not exist`);
        }
      });
    }
  }
});
