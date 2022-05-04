<script setup>
const props = defineProps({
  job: {
    type: Object,
    required: true
  }
});
</script>

<template lang="pug">
.card.w-100
  .card-body
    .card-title= '{{ props.job.name }}'
</template>
