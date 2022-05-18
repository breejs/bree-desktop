<script setup>
import JobStatus from './job-status.vue';
import JobInfo from './job-info.vue';

const props = defineProps({
  jobs: {
    type: Array,
    required: true
  }
});
</script>

<template lang="pug">
template(v-if='jobs.length > 0')
  .card.w-100.mb-3(v-for='job in props.jobs', :key='job.name')
    .card-body.d-flex.flex-row
      .status.me-3.d-flex.align-items-center
        JobStatus(:status='job.status')
      .info.d-flex.flex-column.align-self-center
        JobInfo(:name='job.name', :lastRun='job.lastRun')
template(v-else)
  p= 'No jobs to show'
</template>
