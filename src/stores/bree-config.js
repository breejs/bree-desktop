import superagent from 'superagent';
import { defineStore } from 'pinia';

export const useBreeConfigStore = defineStore({
  id: 'bree-config',
  state: () => ({ config: null }),
  getters: {
    jobs: (state) => state.config?.jobs ?? []
  },
  actions: {
    async fetchConfig() {
      try {
        const res = await superagent.get('http://localhost:3001/config');
        this.config = res.body;
      } catch (err) {
        console.error(err);
      }
    }
  }
});
