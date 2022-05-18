<script setup>
import { computed } from 'vue';

const props = defineProps({
  state: {
    validator(value) {
      return ['running', 'waiting', 'stopped', 'error'].includes(value);
    },
    default: 'error'
  }
});

const STATE_TO_COLOR = new Map([
  ['running', 'success'],
  ['waiting', 'info'],
  ['stopped', 'warning'],
  ['error', 'danger']
]);

const classObject = computed(() => {
  return `text-${STATE_TO_COLOR.get(props.state)}`;
});
</script>

<template lang="pug">
i.bi.bi-circle-fill(:class='classObject')
</template>
