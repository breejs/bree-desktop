<script setup>
import ConnectionListItem from './connection-list-item.vue';
import ConfigModal from '@/components/config-modal/config-modal.vue';

defineProps({
  connections: {
    type: Array,
    required: true
  }
});
</script>

<template lang="pug">
ul.list-group.list-group-flush
  template(v-if='connections?.length > 0')
    template(v-for='connection in connections', :key='connection.name')
      ConnectionListItem(:connection='connection')
      ConfigModal(:name='connection.name', :config='connection.config')

  template(v-else)
    li.list-group-item
      = 'No connections'
</template>
