<script setup>
import JobListItem from './job-list-item.vue';

defineProps({
  jobs: {
    type: [Array, undefined],
    required: true,
    default: () => []
  },
  allowEdit: {
    type: Boolean,
    default: false
  }
});

defineEmits(['start', 'stop', 'restart']);
</script>

<template lang="pug">
ul.list-group.list-group-flush.pe-0
  template(v-if='jobs?.length > 0')
    JobListItem(
      v-for='job in jobs',
      :key='job.name',
      :job='job',
      :allowEdit='allowEdit',
      @start='$emit("start", $event)',
      @stop='$emit("stop", $event)',
      @restart='$emit("restart", $event)'
    )

  template(v-else)
    li.list-group-item
      = 'No jobs'
</template>
