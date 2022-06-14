<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: {
    validator(value) {
      return ['running', 'waiting', 'stopped', 'error'].includes(value);
    },
    type: String,
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

const STATUS_TO_COLOR = new Map([
  ['running', 'success'],
  ['waiting', 'light'],
  ['stopped', 'warning'],
  ['error', 'danger']
]);

const KIND_TO_ICON = new Map([
  ['job', 'square-fill'],
  ['connection', 'card-list']
]);

const textClass = computed(() => {
  return `text-${STATUS_TO_COLOR.get(props.status)}`;
});
const iconClass = computed(() => {
  return `bi-${KIND_TO_ICON.get(props.kind)}`;
});
</script>

<template lang="pug">
i.bi.fs-3(:class='[textClass, iconClass]')
</template>
