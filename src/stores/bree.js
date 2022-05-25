import { defineStore } from 'pinia';

export const useBreeStore = defineStore({
  id: 'bree',
  state: () => ({ jobs: [{ name: 'basic' }] }),
  getters: {
    jobsAsArray() {
      return Object.values(this.jobs);
    }
  },
  actions: {
    processEvent(event, data) {
      const { name } = data;
      const jobIndex = this.jobs.findIndex((j) => j.name === name);
      const job = this.jobs[jobIndex];

      if (job) {
        switch (event) {
          case 'worker-created':
            job.status = 'running';
            break;
          case 'worker-deleted':
            job.status = 'waiting';
            break;
          default:
            break;
        }

        this.jobs[jobIndex] = job;
      }
    }
  }
});
