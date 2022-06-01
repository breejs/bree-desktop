<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: {
    validator(value) {
      return ['running', 'waiting', 'stopped', 'error'].includes(value);
    },
    default: 'error'
  }
});

const STATE_TO_COLOR = new Map([
  ['running', 'success'],
  ['waiting', 'light'],
  ['stopped', 'warning'],
  ['error', 'danger']
]);

const classObject = computed(() => {
  return `text-${STATE_TO_COLOR.get(props.status)}`;
});
</script>

<template lang="pug">
i.bi.bi-circle-fill(:class='classObject')
</template>
