<script setup>
import { onMounted } from 'vue';
import JobCard from '@/components/jobs/job-card.vue';
import { useJobsStore } from '@/stores/jobs';

const jobsStore = useJobsStore();

onMounted(() => {
  jobsStore.fetch();
});
</script>

<template lang="pug">
JobCard.mb-3(v-for='job in jobsStore.jobs', :job='job')
</template>

<style lang="scss" scoped></style>
