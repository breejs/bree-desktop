<script setup>
import { computed, inject } from 'vue';

import JobListItem from './job-list-item.vue';
import JobList from './job-list.vue';

import { breeRestart, breeStop, breeStart } from '@/symbols';

const props = defineProps({
  connection: {
    type: Object,
    required: true
  }
});

const job = computed(() => ({
  name: props.connection.name,
  lastRun: props.connection.lastPing,
  status: props.connection.status,
  eventSource: props.connection.eventSource
}));

const allowEdit = computed(() => {
  if (!props.connection?.url) {
    return false;
  }

  const url = new URL(props.connection.url);

  return url.hostname === 'localhost';
});

const restart = inject(breeRestart);
const stop = inject(breeStop);
const start = inject(breeStart);
</script>

<template lang="pug">
JobListItem(:kind='"connection"', :job='job')
  JobList(
    :jobs='connection.jobs',
    :connectionName='connection.name',
    :allowEdit='allowEdit',
    @start='start(connection.name, $event.name)',
    @stop='stop(connection.name, $event.name)',
    @restart='restart(connection.name, $event.name)'
  )
</template>
