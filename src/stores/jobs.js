import superagent from 'superagent';
import { defineStore } from 'pinia';

export const useJobsStore = defineStore({
  id: 'jobs',
  state: () => ({ jobs: [] }),
  actions: {
    async fetch() {
      try {
        const res = await superagent.get('http://localhost:3001/jobs');
        this.jobs = res.body;
      } catch (err) {
        console.error(err);
      }
    }
  }
});
