<script setup>
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { ref, computed, inject } from 'vue';

import LoadingSpinner from '../loading-spinner.vue';
import JobStatus from './job-status.vue';
import ConnectionStatus from './connection-status.vue';

import {
  breeRestart,
  breeStop,
  breeStart,
  removeConnection,
  startSSE,
  stopSSE
} from '@/symbols';
import ls from '@/local-storage';
import useTauriOpenFile from '@/composables/tauri-open-file';

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
  },
  allowEdit: {
    type: Boolean,
    default: false
  }
});

defineEmits(['start', 'stop', 'restart']);

const running = computed(() => {
  const { status } = props.job;

  return ['active', 'waiting', 'delayed'].includes(status);
});
const hover = ref(false);
const lastRun = computed(() => {
  const date =
    props.job.lastRun && props.job.lastRun instanceof Date
      ? dayjs(props.job.lastRun).fromNow()
      : 'Never';
  const run = props.kind === 'connection' ? 'Ping' : 'Run';

  return `Last ${run}: ${date}`;
});
const toggle = ref(Boolean(ls.get('toggleMap')?.[props.job.name]) || false);
const logsModalId = computed(() => {
  return `#logs-modal-${props.kind === 'connection' ? 'connection-' : ''}${
    props.job.name
  }`;
});

const openFile = useTauriOpenFile();

const restart = inject(breeRestart);
const stop = inject(breeStop);
const start = inject(breeStart);
const remove = inject(removeConnection);
const startConnection = inject(startSSE);
const pauseConnection = inject(stopSSE);

function onToggleClick() {
  const toggleObj = ls.get('toggleMap') || {};

  toggleObj[props.job.name] = !toggleObj[props.job.name];

  ls.set('toggleMap', toggleObj);
  toggle.value = toggleObj[props.job.name];
}

// listen for toogleMap changes
ls.on('toggleMap', (val) => {
  toggle.value = val[props.job.name];
});
</script>

<template lang="pug">
li.list-group-item
  .row.align-items-center(
    @mouseover='hover = true',
    @mouseleave='hover = false'
  )
    .col.col-auto.pointer(
      v-if='kind === "connection"',
      @click='onToggleClick()'
    )
      i.bi.bi-chevron-right(v-if='!toggle')
      i.bi.bi-chevron-down(v-if='toggle')
    .col.col-auto
      template(v-if='kind === "job"')
        JobStatus(:status='job.status')
      template(v-if='kind === "connection"')
        ConnectionStatus(:status='job.status')
    .col.text-start.lh-1
      .row
        .col
          small
            = '{{ job.name }}'
            span.text-muted(v-if='job.connection?.name')
              = ' - {{ job.connection.name }}'
            span.ms-3
              LoadingSpinner(
                :name='kind === "connection" ? job.name : job.hash'
              )
            template(v-if='kind === "connection"')
              span.text-danger.ms-3(v-if='job.eventSource?.readyState === 0')
                | Attempting to connect...
                i.bi.bi-pause-btn.pointer.ms-1(
                  @click='pauseConnection(job.name)'
                )
              span.text-warning.ms-3(v-if='job.eventSource?.readyState === 2')
                | Paused connection...
                i.bi.bi-play-btn.pointer.ms-1(@click='startConnection(job)')
      .row
        .col
          small.text-muted= '{{ lastRun }}'
    .col.col-auto(v-show='hover')
      span(v-tooltip:title='"View Config"')
        button.btn.btn-outline-info.me-1(
          v-if='kind === "connection"',
          data-bs-toggle='modal',
          :data-bs-target='"#config-modal-" + job.name'
        )
          i.bi.bi-gear-fill
      span(v-tooltip:title='"View Logs"')
        button.btn.btn-outline-info.me-1(
          data-bs-toggle='modal',
          :data-bs-target='logsModalId'
        )
          i.bi.bi-terminal-fill
      button.btn.btn-outline-info.me-1(
        v-if='openFile && allowEdit && kind === "job" && job.path',
        v-tooltip:title='"Edit"',
        @click='openFile(job.path)'
      )
        i.bi.bi-pencil-square
      button.btn.btn-outline-danger.me-1(
        v-if='running',
        v-tooltip:title='"Stop"',
        @click='kind === "connection" ? stop(job.name) : $emit("stop", job)'
      )
        i.bi.bi-stop-fill
      button.btn.btn-outline-success.me-1(
        v-if='!running',
        v-tooltip:title='"Start"',
        @click='kind === "connection" ? start(job.name) : $emit("start", job)'
      )
        i.bi.bi-play-fill
      button.btn.btn-outline-warning.me-1(
        v-bind:disabled='!running',
        v-tooltip:title='"Restart"',
        @click='kind === "connection" ? restart(job.name) : $emit("restart", job)'
      )
        i.bi.bi-arrow-clockwise
      button.btn.btn-outline-danger(
        v-if='kind === "connection"',
        v-tooltip:title='"Delete"',
        @click='remove(job.name)'
      )
        i.bi.bi-trash-fill
  .row.ms-4(v-if='toggle')
    slot
</template>
