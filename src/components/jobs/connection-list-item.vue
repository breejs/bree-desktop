<script setup>
import { computed, ref } from 'vue';

import JobListItem from './job-list-item.vue';
import JobList from './job-list.vue';

const props = defineProps({
  connection: {
    type: Object,
    required: true
  }
});

const job = computed(() => ({
  name: props.connection.name,
  lastRun: props.connection.lastPing,
  status: props.connection.status
}));
</script>

<template lang="pug">
JobListItem(:kind='"connection"', :job='job')
  JobList(:jobs='props.connection.jobs')
</template>
