<script setup>
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { ref, computed, inject } from 'vue';

import JobStatus from './job-status.vue';
import ConnectionStatus from './connection-status.vue';

import { breeRestart, breeStop, breeStart } from '@/symbols';

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

defineEmits(['start', 'stop', 'restart']);

const running = computed(() => {
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

const restart = inject(breeRestart);
const stop = inject(breeStop);
const start = inject(breeStart);
</script>

<template lang="pug">
li.list-group-item
  .row.align-items-center(
    @mouseover='hover = true',
    @mouseleave='hover = false'
  )
    .col.col-auto.pointer(
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
        v-if='running',
        v-tooltip:title='"Stop"',
        @click='kind === "connection" ? stop(job.name) : $emit("stop", job.name)'
      )
        i.bi.bi-stop-fill
      button.btn.btn-outline-success.me-1(
        v-if='!running',
        v-tooltip:title='"Start"',
        @click='kind === "connection" ? start(job.name) : $emit("start", job.name)'
      )
        i.bi.bi-play-fill
      button.btn.btn-outline-warning.me-1(
        v-bind:disabled='!running',
        v-tooltip:title='"Restart"',
        @click='kind === "connection" ? restart(job.name) : $emit("restart", job.name)'
      )
        i.bi.bi-arrow-clockwise
      button.btn.btn-outline-danger(v-tooltip:title='"Delete"')
        i.bi.bi-trash-fill
  .row.ms-4(v-if='toggle')
    slot
</template>
