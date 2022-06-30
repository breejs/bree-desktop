<script setup>
import { watch, ref } from 'vue';

import { useBreeStore } from '@/stores/bree';
import ConnectionList from '@/components/jobs/connection-list.vue';
import JobList from '@/components/jobs/job-list.vue';
import FilterFuzzy from '@/components/filter/filter-fuzzy.vue';

const breeStore = useBreeStore();

const debounce = 250;

function selector(val) {
  return val.name;
}

const jobList = ref([]);
const filteredList = ref([]);

watch(breeStore.connections, (value) => {
  const res = [];

  // reduce down so that jobs are in a flat array
  for (const connection of value) {
    for (const job of connection.jobs) {
      res.push({ ...job, connection });
    }
  }

  jobList.value = res;
});

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
