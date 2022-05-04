<script setup>
import { storeToRefs } from 'pinia';

import JobCard from '@/components/jobs/job-card.vue';

import { useJobsStore } from '@/stores/jobs';

const jobsStore = useJobsStore();

const { jobs } = storeToRefs(jobsStore);
</script>

<template lang="pug">
JobCard.mb-3(v-for='job in jobs', :job='job')
</template>

<style lang="scss" scoped></style>
