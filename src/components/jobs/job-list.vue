<script setup>
import LogsModal from '../logs-modal/logs-modal.vue';
import JobListItem from './job-list-item.vue';

defineProps({
  jobs: {
    type: [Array, undefined],
    required: true,
    default: () => []
  },
  connectionName: {
    type: String,
    required: true
  },
  allowEdit: {
    type: Boolean,
    default: false
  }
});

defineEmits(['start', 'stop', 'restart']);
</script>

<template lang="pug">
LogsModal(:kind='"connection"', :connectionName='connectionName')

ul.list-group.list-group-flush.pe-0
  template(v-if='jobs?.length > 0')
    template(v-for='job in jobs', :key='job.name')
      LogsModal(
        :kind='"job"',
        :jobName='job.name',
        :connectionName='connectionName'
      )

      JobListItem(
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
