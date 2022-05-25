<script setup>
import JobCardList from '@/components/jobs/job-card-list.vue';
import { useBreeStore } from '@/stores/bree';

const breeStore = useBreeStore();
</script>

<template lang="pug">
.w-100
  JobCardList(:jobs='breeStore.jobsAsArray')
</template>
