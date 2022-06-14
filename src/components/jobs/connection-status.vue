<script setup>
import JobStatus from './job-status.vue';

const props = defineProps({
  status: {
    validator(value) {
      return ['running', 'waiting', 'stopped', 'error'].includes(value);
    },
    type: String,
    required: true
  }
});
</script>

<template lang="pug">
JobStatus(:kind='"connection"', :status='props.status')
</template>
