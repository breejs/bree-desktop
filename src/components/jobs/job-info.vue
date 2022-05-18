<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  lastRun: Date
});

const lastRun = computed(() => {
  return props.lastRun?.toLocaleString() || 'never';
});
</script>

<template lang="pug">
.row
  h4= '{{ props.name }}'
.row
  p.text-muted= 'Last run: {{ lastRun }}'
</template>
