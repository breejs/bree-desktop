<script setup>
import { useBreeStore } from '@/stores/bree';
import ConnectionList from '@/components/jobs/connection-list.vue';

const breeStore = useBreeStore();
</script>

<template lang="pug">
.w-100(v-if='breeStore.connections')
  ConnectionList(:connections='breeStore.connections')
</template>
