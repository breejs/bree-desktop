<script setup>
import { computed, capitalize } from 'vue';

const props = defineProps({
  status: {
    validator(value) {
      return ['active', 'done', 'delayed', 'waiting', 'error'].includes(value);
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

const KIND_TO_ICON = new Map([
  ['job', 'square-fill'],
  ['connection', 'card-list']
]);

const textClass = computed(() => {
  return `text-${props.status}`;
});
const iconClass = computed(() => {
  return `bi-${KIND_TO_ICON.get(props.kind)}`;
});
const tooltip = computed(() => {
  return capitalize(props.status);
});
</script>

<template lang="pug">
i.bi.fs-3(:class='[textClass, iconClass]', v-tooltip:title='tooltip')
</template>

<style scoped>
.text-delayed {
  color: var(--bs-yellow);
}

.text-waiting {
  color: var(--bs-orange);
}

.text-error {
  color: var(--bs-red);
}

.text-active {
  color: var(--bs-green);
}

.text-done {
  color: var(--bs-teal);
}
</style>
