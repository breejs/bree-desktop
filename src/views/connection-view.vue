<script setup>
import { computed, ref } from 'vue';

import { useBreeStore } from '@/stores/bree';
import JobList from '@/components/jobs/job-list.vue';
import FilterFuzzy from '@/components/filter/filter-fuzzy.vue';

const props = defineProps({
  connection: {
    type: String,
    required: true
  }
});

const breeStore = useBreeStore();

const debounce = 250;

function selector(val) {
  return val.name;
}

const conn = computed(() =>
  breeStore.connections.find((c) => c.name === props.connection)
);
const jobList = computed(() => conn.value?.jobs ?? []);
const filteredList = ref([]);

function onFilter(value) {
  filteredList.value = value.map((v) => jobList.value[v.index]);
}
</script>

<template lang="pug">
.w-100(v-if='conn')
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
      JobList(
        :jobs='filteredList.length > 0 ? filteredList : conn.jobs',
        :connectionName='conn.name',
        @start='breeStore.start(conn.name, $event.name)',
        @stop='breeStore.stop(conn.name, $event.name)',
        @restart='breeStore.restart(conn.name, $event.name)'
      )
</template>
