<script setup>
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { ref, computed } from 'vue';

import JobStatus from './job-status.vue';
import ConnectionStatus from './connection-status.vue';

dayjs.extend(RelativeTime);

const props = defineProps({
  job: {
    type: Object,
    required: true
  },
  kind: {
    validator(value) {
      return ['job', 'connection'].includes(value);
    },
    type: String,
    default: 'job'
  }
});

const showPlay = computed(() => {
  const { status } = props.job;

  return status === 'running' || status === 'waiting';
});
const hover = ref(false);
const lastRun = computed(() =>
  props.job.lastRun && props.job.lastRun instanceof Date
    ? dayjs(props.job.lastRun).fromNow()
    : 'Never'
);
const toggle = ref(false);
</script>

<template lang="pug">
li.list-group-item
  .row.align-items-center(
    @mouseover='hover = true',
    @mouseleave='hover = false'
  )
    .col.col-auto(
      v-if='props.kind === "connection"',
      @click='toggle = !toggle'
    )
      i.bi.bi-chevron-right(v-if='!toggle')
      i.bi.bi-chevron-down(v-if='toggle')
    .col.col-auto
      template(v-if='props.kind === "job"')
        JobStatus(:status='props.job.status')
      template(v-if='props.kind === "connection"')
        ConnectionStatus(:status='props.job.status')
    .col.text-start.lh-1
      .row
        .col
          small= '{{ props.job.name }}'
      .row
        .col
          small.text-muted= '{{ lastRun }}'
    .col.col-auto(v-show='hover')
      button.btn.btn-outline-danger.me-1(
        v-if='!showPlay',
        v-tooltip:title='"Stop"'
      )
        i.bi.bi-stop-fill
      button.btn.btn-outline-success.me-1(
        v-if='showPlay',
        v-tooltip:title='"Start"'
      )
        i.bi.bi-play-fill
      button.btn.btn-outline-warning.me-1(
        v-bind:disabled='showPlay',
        v-tooltip:title='"Restart"'
      )
        i.bi.bi-arrow-clockwise
      button.btn.btn-outline-danger(v-tooltip:title='"Delete"')
        i.bi.bi-trash-fill
  .row.ms-4(v-if='toggle')
    slot
</template>
