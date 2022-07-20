import { defineStore } from 'pinia';

export const useLoadingStore = defineStore({
  id: 'loading',
  state: () => ({
    /**
     * set of loading items
     *
     * this is keyed by either the connection name
     * or a hash of connection name and job name
     *
     * @type {Set<string>}
     * */
    loading: new Set()
  }),
  actions: {
    /**
     * add a loading item
     *
     * @param {string} name
     */
    add(name) {
      this.loading.add(name);
    },

    /**
     * remove a loading item
     *
     * @param {string} name
     */
    remove(name) {
      this.loading.delete(name);
    },

    /**
     * has a loading item
     *
     * @param {string} name
     *
     * @returns {boolean}
     */
    has(name) {
      return this.loading.has(name);
    }
  }
});
