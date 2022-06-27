<script setup>
import JobStatus from './job-status.vue';

const props = defineProps({
  status: {
    validator(value) {
      return ['active', 'done', 'delayed', 'waiting', 'error'].includes(value);
    },
    type: String,
    required: true
  }
});
</script>

<template lang="pug">
JobStatus(:kind='"connection"', :status='props.status')
</template>
