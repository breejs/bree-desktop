import { defineStore } from 'pinia';
import request from 'superagent';

export const useBreeStore = defineStore({
  id: 'bree',
  persist: true,
  state: () => ({
    /** @type {Connection[]} */
    connections: [
      /* {
        name: 'localhost',
        url: 'http://localhost:62893',
        status: 'done'
      } */
    ]
  }),
  getters: {},
  actions: {
    /**
     * setup all connections
     */
    async setup() {
      return Promise.all(
        this.connections.map(async (c) => {
          return Promise.all([this.startSSE(c), this.fetchJobs(c)]);
        })
      );
    },

    /**
     * add a new connection
     *
     * @param {Connection} connection
     *
     * @returns {Promise<void>}
     */
    async addConnection({ name, url, token }) {
      const connection = { name, url, token, status: 'waiting' };
      this.connections.push(connection);

      return this.startSSE(connection);
    },

    /**
     * remove a connection
     *
     * @param {string} name
     */
    removeConnection(name) {
      const idx = this.connections.findIndex((c) => c.name === name);

      if (idx >= 0) {
        // end EventSource
        this.connections[idx].eventSource?.close();

        this.connections.splice(idx);
      }
    },

    /**
     * fetch jobs for a connection
     *
     * @param {Connection} connection
     *
     * @returns {Promise<void>}
     */
    async fetchJobs(connection) {
      const res = await request.get(`${connection.url}/v1/jobs`);

      connection.jobs = res.body;
    },

    /**
     * restrart job or connection
     *
     * @param {string} connectionName
     * @param {string} jobName
     *
     * @returns {Promise<void>}
     */
    async restart(connectionName, jobName) {
      const connection = getConnectionFromName(
        this.connections,
        connectionName
      );
      const url = `${connection.url}/v1/restart`;

      if (jobName) {
        const jobIdx = getJobIndexFromName(connection, jobName);

        connection.jobs[jobIdx].status = 'done';

        const res = await request.post(`${url}/${jobName}`);

        if (Array.isArray(res.body) && res.body.length === 1) {
          connection.jobs.splice(jobIdx, 1, res.body[0]);
        }
      } else {
        connection.status = 'done';
        connection.jobs = connection.jobs.map((j) => {
          j.status = 'done';
          return j;
        });

        await request.post(url);

        connection.status = 'active';
      }
    },

    /**
     * stop job or connection
     *
     * @param {string} connectionName
     * @param {string} jobName
     *
     * @returns {Promise<void>}
     */
    async stop(connectionName, jobName) {
      const connection = getConnectionFromName(
        this.connections,
        connectionName
      );
      const url = `${connection.url}/v1/stop`;

      if (jobName) {
        const jobIdx = getJobIndexFromName(connection, jobName);

        const res = await request.post(`${url}/${jobName}`);

        if (Array.isArray(res.body) && res.body.length === 1) {
          connection.jobs.splice(jobIdx, 1, res.body[0]);
        }
      } else {
        await request.post(url);

        connection.jobs = connection.jobs.map((j) => {
          j.status = 'done';
          return j;
        });
        connection.status = 'done';
      }
    },

    /**
     * start job or connection
     *
     * @param {string} connectionName
     * @param {string} jobName
     *
     * @returns {Promise<void>}
     */
    async start(connectionName, jobName) {
      const connection = getConnectionFromName(
        this.connections,
        connectionName
      );
      const url = `${connection.url}/v1/start`;

      if (jobName) {
        const jobIdx = getJobIndexFromName(connection, jobName);

        const res = await request.post(`${url}/${jobName}`);

        if (Array.isArray(res.body) && res.body.length === 1) {
          connection.jobs.splice(jobIdx, 1, res.body[0]);
        }
      } else {
        await request.post(url);

        connection.status = 'active';
      }
    },

    /**
     * start SSE for a connection
     * @param {Connection} connection
     *
     * @returns {Promise<void>}
     */
    async startSSE(connection) {
      let url = `${connection.url}/v1/sse`;

      if (connection.token) {
        url += `/${connection.token}`;
      }

      const es = new EventSource(url);
      connection.eventSource = es;

      es.addEventListener('open', async () => {
        await this.fetchJobs(connection);
        connection.status = 'active';
        connection.lastPing = new Date();
      });

      es.addEventListener('ping', () => {
        connection.lastPing = new Date();
      });

      es.addEventListener('error', () => {
        connection.status = 'error';
      });

      es.addEventListener('close', () => {
        console.log('close');
        connection.status = 'done';
        connection.eventSource = null;
      });

      es.addEventListener('worker created', ({ data }) => {
        const job = getJobFromName(connection, data);

        if (job) {
          job.status = 'active';
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

/**
 * get connection from name
 *
 * @param {Connection[]} connections
 * @param {string} name
 *
 * @returns {Connection|undefined}
 */
function getConnectionFromName(connections, name) {
  return connections.find((c) => c.name === name);
}

/**
 * get job from name
 *
 * @param {Connection} connection
 * @param {string} name
 *
 * @returns {Job|undefined}
 */
function getJobFromName(connection, name) {
  return connection.jobs.find((j) => j.name === name);
}

/**
 * get job index from name
 *
 * @param {Connection} connection
 * @param {string} name
 *
 * @returns {number}
 */
function getJobIndexFromName(connection, name) {
  return connection.jobs.findIndex((j) => j.name === name);
}

/**
 * @typedef {Object} Connection
 *
 * @property {string} name
 * @property {string} url
 * @property {string} [token]
 * @property {string} status
 * @property {EventSource} [eventSource]
 * @property {Date} [lastPing]
 * @property {Job[]} jobs
 */
