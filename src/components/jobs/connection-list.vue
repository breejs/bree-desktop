<script setup>
import ConnectionListItem from './connection-list-item.vue';

const props = defineProps({
  connections: {
    type: Array,
    required: true
  }
});
</script>

<template lang="pug">
ul.list-group.list-group-flush
  template(v-if='props.connections?.length > 0')
    ConnectionListItem(
      v-for='connection in props.connections',
      :key='connection.name',
      :connection='connection'
    )

  template(v-else)
    li.list-group-item
      = 'No connections'
</template>
