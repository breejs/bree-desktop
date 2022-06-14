<script setup>
import JobList from '@/components/jobs/job-list.vue';
import { useBreeStore } from '@/stores/bree';

const breeStore = useBreeStore();
</script>

<template lang="pug">
.w-100
  JobList(:jobs='breeStore.jobsAsArray')
</template>
