<script setup>
import { watch, ref, computed } from 'vue';

import { storeToRefs } from 'pinia';
import { useBreeStore } from '@/stores/bree';
import ConnectionList from '@/components/jobs/connection-list.vue';
import JobList from '@/components/jobs/job-list.vue';
import FilterFuzzy from '@/components/filter/filter-fuzzy.vue';
import AddConnectionForm from '@/components/add-connection-form/add-connection-form.vue';

/** bree store */
const breeStore = useBreeStore();
const { connections } = storeToRefs(breeStore);

/** debounce time (ms) */
const debounce = 250;

/** list of jobs */
const jobList = ref([]);
/** filtered list of jobs */
const filteredList = ref([]);

/** list of connection names */
const connectionNames = ref([]);

watch(connections, (value) => {
  const jobs = [];
  const names = [];

  // reduce down so that jobs are in a flat array
  // also create names array
  for (const connection of value) {
    names.push(connection.name);

    if (Array.isArray(connection.jobs)) {
      for (const job of connection.jobs) {
        jobs.push({ ...job, connection });
      }
    }
  }

  connectionNames.value = names;
  jobList.value = jobs;
});

/**
 * selector function for filtering jobs
 * @param {object} val
 * @returns {string} - value
 */
function selector(val) {
  return val.name;
}

/**
 * filter jobs by name
 * @param {string} value
 */
function onFilter(value) {
  filteredList.value = value.map((v) => jobList.value[v.index]);
}
</script>

<template lang="pug">
.w-100(v-if='breeStore.connections')
  .row
    .col
      FilterFuzzy(
        :debounce='debounce',
        :list='jobList',
        :selector='selector',
        @change='onFilter($event)'
      )
    .col.col-auto
      button.btn.btn-success(
        type='button',
        data-bs-toggle='modal',
        data-bs-target='#add-connection-modal',
        aria-hidden='true'
      )
        | Add Connection

      AddConnectionForm(
        :connectionNames='connectionNames',
        @submit='breeStore.addConnection($event)'
      )

  .row
    .col
      ConnectionList(
        v-if='filteredList.length === 0',
        :connections='breeStore.connections'
      )
      JobList(
        v-else,
        :jobs='filteredList',
        @start='breeStore.start($event.connection.name, $event.name)',
        @stop='breeStore.stop($event.connection.name, $event.name)',
        @restart='breeStore.restart($event.connection.name, $event.name)'
      )
</template>
