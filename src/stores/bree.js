import { defineStore } from 'pinia';

export const EVENTS_TO_ACTIONS = new Map([
  ['worker-created', 'onWorkerCreated'],
  ['worker-deleted', 'onWorkerDeleted']
]);

export const useBreeStore = defineStore({
  id: 'bree',
  state: () => ({ jobs: [{ name: 'basic' }] }),
  getters: {
    jobsAsArray() {
      return Object.values(this.jobs);
    }
  },
  actions: {
    onWorkerCreated(data) {
      const jobIndex = this.jobs.findIndex((j) => j.name === data.name);
      const job = this.jobs[jobIndex];

      this.jobs[jobIndex] = { ...job, status: 'running' };
    },
    onWorkerDeleted(data) {
      const jobIndex = this.jobs.findIndex((j) => j.name === data.name);
      const job = this.jobs[jobIndex];

      this.jobs[jobIndex] = { ...job, status: 'waiting', lastRun: new Date() };
    }
  }
});
