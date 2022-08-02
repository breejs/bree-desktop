import { defineStore } from 'pinia';
import request from 'superagent';

import { useLoadingStore } from './loading';

export const useBreeStore = defineStore({
  id: 'bree',
  persist: true,
  state: () => ({
    /** @type {Connection[]} */
    connections: [
      {
        name: 'localhost',
        url: 'http://localhost:62893',
        jobs: [],
        logs: [],
        status: 'waiting',
        token: ''
      }
    ]
  }),
  getters: {
    /**
     * get the number of "active" jobs
     *
     * @returns {number}
     */
    numActive(state) {
      let count = 0;

      for (const c of state.connections) {
        for (const j of c.jobs) {
          if (j.status === 'active') {
            count++;
          }
        }
      }

      return count;
    },

    /**
     * get the number of "done" jobs
     *
     * @returns {number}
     */
    numDone(state) {
      let count = 0;

      for (const c of state.connections) {
        for (const j of c.jobs) {
          if (j.status === 'done') {
            count++;
          }
        }
      }

      return count;
    },

    /**
     * get the number of "delayed" jobs
     *
     * @returns {number}
     */
    numDelayed(state) {
      let count = 0;

      for (const c of state.connections) {
        for (const j of c.jobs) {
          if (j.status === 'delayed') {
            count++;
          }
        }
      }

      return count;
    },

    /**
     * get the number of "waiting" jobs
     *
     * @returns {number}
     */
    numWaiting(state) {
      let count = 0;

      for (const c of state.connections) {
        for (const j of c.jobs) {
          if (j.status === 'waiting') {
            count++;
          }
        }
      }

      return count;
    },

    /**
     * get the number of "error" jobs
     *
     * @returns {number}
     */
    numError(state) {
      let count = 0;

      for (const c of state.connections) {
        for (const j of c.jobs) {
          if (j.status === 'error') {
            count++;
          }
        }
      }

      return count;
    },

    /**
     * get logs for a job or connection
     *
     * @returns {LogsGetterCallback} - logs getter callback
     */
    logs(state) {
      const loading = useLoadingStore();
      const { connections } = state;

      return (connectionName, jobName) => {
        loading.add(`logs:${connectionName}${jobName ? ':' + jobName : ''}`);
        const connection = getConnectionFromName(connections, connectionName);
        let res = [];

        if (connection) {
          res = jobName
            ? connection.logs.filter((l) => l.name === jobName)
            : connection.logs;
        }

        loading.remove(`logs:${connectionName}${jobName ? ':' + jobName : ''}`);
        return res;
      };
    }
  },
  actions: {
    /**
     * setup all connections
     */
    async setup() {
      return Promise.all(
        this.connections.map(async (c) => {
          return this.startSSE(c);
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
      const connection = {
        name,
        url,
        token,
        status: 'waiting',
        jobs: [],
        logs: []
      };
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
      const loading = useLoadingStore();

      loading.add(connection.name);
      const res = await request.get(`${connection.url}/v1/jobs`);

      connection = getConnectionFromName(this.connections, connection.name);

      connection.jobs = res.body.map((j) => ({
        ...j,
        hash: getJobHash(connection.name, j.name)
      }));

      loading.remove(connection.name);
    },

    /**
     * get configs for a connection
     *
     * @param {string} name - connection name
     *
     * @returns {Promise<BreeConfig>}
     */
    async getConfig(name) {
      const loading = useLoadingStore();

      loading.add(name);
      const connection = getConnectionFromName(this.connections, name);

      const res = await request.get(`${connection.url}/v1/config`);

      connection.config = res.body;

      loading.remove(name);

      return res.body;
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
      const loading = useLoadingStore();
      const connection = getConnectionFromName(
        this.connections,
        connectionName
      );
      const url = `${connection.url}/v1/restart`;

      if (jobName) {
        const jobIdx = getJobIndexFromName(connection, jobName);

        connection.jobs[jobIdx].status = 'done';

        loading.add(connection.jobs[jobIdx].hash);

        try {
          const res = await request.post(`${url}/${jobName}`);

          if (Array.isArray(res.body) && res.body.length === 1) {
            connection.jobs.splice(jobIdx, 1, {
              ...res.body[0],
              hash: connection.jobs[jobIdx].hash
            });
          }
        } catch (err) {
          connection.jobs[jobIdx].status = 'error';

          console.error(err);
        }

        loading.remove(connection.jobs[jobIdx].hash);

        return;
      }

      connection.status = 'done';

      loading.add(connection.name);

      try {
        await request.post(url);

        connection.status = 'active';
      } catch (err) {
        connection.status = 'error';

        console.error(err);
      }

      loading.remove(connection.name);

      return this.fetchJobs(connection);
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
      const loading = useLoadingStore();
      const connection = getConnectionFromName(
        this.connections,
        connectionName
      );
      const url = `${connection.url}/v1/stop`;

      if (jobName) {
        const jobIdx = getJobIndexFromName(connection, jobName);

        loading.add(connection.jobs[jobIdx].hash);
        try {
          const res = await request.post(`${url}/${jobName}`);

          if (Array.isArray(res.body) && res.body.length === 1) {
            connection.jobs.splice(jobIdx, 1, {
              ...res.body[0],
              hash: connection.jobs[jobIdx].hash
            });
          }
        } catch (err) {
          connection.jobs[jobIdx].status = 'error';

          console.error(err);
        }

        loading.remove(connection.jobs[jobIdx].hash);

        return;
      }

      loading.add(connection.name);
      try {
        await request.post(url);

        connection.jobs = connection.jobs.map((j) => {
          j.status = 'done';
          return j;
        });
        connection.status = 'done';
      } catch (err) {
        connection.status = 'error';

        console.error(err);
      }

      loading.remove(connection.name);
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
      const loading = useLoadingStore();
      const connection = getConnectionFromName(
        this.connections,
        connectionName
      );
      const url = `${connection.url}/v1/start`;

      if (jobName) {
        const jobIdx = getJobIndexFromName(connection, jobName);

        loading.add(connection.jobs[jobIdx].hash);
        const res = await request.post(`${url}/${jobName}`);

        if (Array.isArray(res.body) && res.body.length === 1) {
          connection.jobs.splice(jobIdx, 1, {
            ...res.body[0],
            hash: connection.jobs[jobIdx].hash
          });
        }

        loading.remove(connection.jobs[jobIdx].hash);
      } else {
        loading.add(connection.name);
        await request.post(url);

        connection.status = 'active';
        loading.remove(connection.name);

        return this.fetchJobs(connection);
      }
    },

    /**
     * start SSE for a connection
     *
     * @param {Connection} connection
     *
     * @returns {Promise<void>}
     */
    async startSSE(connection) {
      connection = getConnectionFromName(this.connections, connection.name);
      let url = `${connection.url}/v1/sse`;

      if (connection.token) {
        url += `/${connection.token}`;
      }

      const es = new EventSource(url);
      connection.eventSource = es;

      es.addEventListener('open', async () => {
        await this.fetchJobs(connection);
        connection.lastPing = new Date();
      });

      es.addEventListener('ping', () => {
        connection.lastPing = new Date();
      });

      es.addEventListener('status', ({ data }) => {
        connection.status = JSON.parse(data) ? 'active' : 'done';
      });

      es.addEventListener('error', () => {
        connection.status = 'error';
      });

      es.addEventListener('close', () => {
        connection.status = 'done';
        connection.eventSource = null;
      });

      es.addEventListener('worker created', ({ data }) => {
        connection.logs.push({
          type: 'worker created',
          name: data,
          date: new Date()
        });

        const job = getJobFromName(connection, data);

        if (job) {
          job.status = 'active';
          job.lastRun = new Date();
        } else {
          console.error(`Job "${data}" does not exist`);
        }
      });

      es.addEventListener('worker deleted', ({ data }) => {
        connection.logs.push({
          type: 'worker deleted',
          name: data,
          date: new Date()
        });

        const job = getJobFromName(connection, data);

        if (job) {
          job.status = 'waiting';
        } else {
          console.error(`Job "${data}" does not exist`);
        }
      });

      es.addEventListener('worker message', ({ data }) => {
        data = JSON.parse(data);

        connection.logs.push({
          type: 'worker message',
          name: data.name,
          date: new Date(),
          message: data.message
        });
      });

      es.addEventListener('worker error', ({ data }) => {
        data = JSON.parse(data);

        connection.logs.push({
          type: 'worker error',
          name: data.name,
          date: new Date(),
          message: data.error
        });
      });
    },

    /**
     * stop SSE
     *
     * @param {string} name - connection name
     *
     * @returns {void}
     */
    stopSSE(name) {
      const connection = getConnectionFromName(this.connections, name);

      if (connection.eventSource) {
        connection.eventSource.close();
      }
    },

    /**
     * clear logs
     *
     * @param {string} connectionName - connection name
     * @param {?string} jobName - job name
     *
     * @returns {void}
     */
    clearLogs(connectionName, jobName) {
      const connection = getConnectionFromName(
        this.connections,
        connectionName
      );

      connection.logs = jobName
        ? connection.logs.filter((l) => l.name !== jobName)
        : [];
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
 * get hash from connection name and job name
 *
 * @param {string} connectionName
 * @param {string} jobName
 *
 * @returns {string}
 */
export function getJobHash(connectionName, jobName) {
  return JSON.stringify({ connection: connectionName, job: jobName });
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
 * @property {Log[]} logs
 */

/**
 * @callback LogsGetterCallback
 *
 * @param {string} connectionName - connection name
 * @param {string} jobName - job name
 *
 * @returns {Log[]} - logs
 */
