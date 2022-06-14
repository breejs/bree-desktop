<script setup>
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { ref, computed } from 'vue';

import JobStatus from './job-status.vue';

dayjs.extend(RelativeTime);

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
});

function showPlay(status) {
  return status === 'running' || status === 'waiting';
}

const hover = ref(false);
const lastRun = computed(() =>
  props.job.lastRun && props.job.lastRun instanceof Date
    ? dayjs(props.job.lastRun).fromNow()
    : 'Never'
);
</script>

<template lang="pug">
li.list-group-item(@mouseover='hover = true', @mouseleave='hover = false')
  .row.align-items-center
    .col.col-auto
      JobStatus(:status='props.job.status')
    .col.text-start.lh-1
      .row
        .col
          small= '{{ props.job.name }}'
      .row
        .col
          small.text-muted= '{{ lastRun }}'
    .col.col-auto(v-show='hover')
      button.btn.btn-outline-danger.me-1(
        v-if='!showPlay(props.job.status)',
        v-tooltip:title='"Stop"'
      )
        i.bi.bi-stop-fill
      button.btn.btn-outline-success.me-1(
        v-if='showPlay(props.job.status)',
        v-tooltip:title='"Start"'
      )
        i.bi.bi-play-fill
      button.btn.btn-outline-warning.me-1(
        v-bind:disabled='showPlay(props.job.status)',
        v-tooltip:title='"Restart"'
      )
        i.bi.bi-arrow-clockwise
      button.btn.btn-outline-danger(v-tooltip:title='"Delete"')
        i.bi.bi-trash-fill
</template>
