<script setup>
import { computed } from 'vue';
import { useLoadingStore } from '@/stores/loading';

const props = defineProps({
  /**
   * name of loading spinner to use
   *
   * @type {string|undefined}
   */
  name: {
    type: String
  }
});

const store = useLoadingStore();

const isLoading = computed(() => props.name && store.has(props.name));
</script>

<template lang="pug">
.spinner-border.spinner-border-sm(v-if='isLoading', role='status')
  span.visually-hidden Loading...
</template>
