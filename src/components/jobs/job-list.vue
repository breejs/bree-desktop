<script setup>
import JobListItem from './job-list-item.vue';

const props = defineProps({
  jobs: {
    type: Array,
    required: true
  }
});

defineEmits(['start', 'stop', 'restart']);
</script>

<template lang="pug">
ul.list-group.list-group-flush.pe-0
  template(v-if='jobs?.length > 0')
    JobListItem(
      v-for='job in props.jobs',
      :key='job.name',
      :job='job',
      @start='$emit("start", $event)',
      @stop='$emit("stop", $event)',
      @restart='$emit("restart", $event)'
    )

  template(v-else)
    li.list-group-item
      = 'No jobs'
</template>
