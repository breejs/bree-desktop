import { defineStore } from 'pinia';

export const useJobsStore = defineStore({
  id: 'jobs',
  state: () => ({ jobs: [{ name: 'job 1' }, { name: 'job 2' }] })
});
