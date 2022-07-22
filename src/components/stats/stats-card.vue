<script setup>
import { computed } from 'vue';

const props = defineProps({
  /**
   * title text
   */
  title: {
    type: String,
    required: true
  },
  /**
   * value to display
   */
  value: {
    type: Number,
    required: true
  },
  /**
   * icon
   */
  icon: {
    type: String,
    required: true
  },
  /**
   * color of the card
   */
  color: {
    type: String,
    required: true,
    validator(value) {
      return [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark'
      ].includes(value);
    }
  }
});

const bgClass = computed(() => {
  return `bg-${props.color}`;
});
const textClass = computed(() => {
  if (['warning', 'info', 'light'].includes(props.color)) {
    return 'text-black';
  }

  return 'text-white';
});
const iconClass = computed(() => {
  return `bi-${props.icon}`;
});
</script>

<template lang="pug">
.card.h-100(:class='[bgClass, textClass]')
  .card-body.d-flex
    .row
      .col.col-auto.my-auto
        i.bi.fs-1(:class='iconClass')
      .col.my-auto
        small.card-subtitle
          = '{{ title }}'
        h3.card-title.mb-0
          = '{{ value }}'
</template>
