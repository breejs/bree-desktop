import superagent from 'superagent';
import { defineStore } from 'pinia';

export const useWorkersStore = defineStore({
  id: 'workers',
  state: () => ({ workers: new Map() }),
  actions: {
    async fetch() {
      try {
        const res = await superagent.get('http://localhost:3001/workers');
        this.jobs = res.body;
      } catch (err) {
        console.error(err);
      }
    }
  }
});
