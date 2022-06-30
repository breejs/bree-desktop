<script setup>
import { ref, computed, watchEffect, watch, toRefs } from 'vue';
import { filter } from '@nexucis/fuzzy';

import FilterInput from './filter-input.vue';

const props = defineProps({
  // debounce for onInput check
  // (in milliseconds)
  debounce: {
    type: Number,
    default: 0
  },
  list: {
    type: Array,
    required: true
  },
  // function that takes a value and returns a string
  selector: {
    type: Function,
    default: false
  },
  caseSensitive: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['change']);

const pattern = ref('');

const listRef = ref([]);

function onChange(value) {
  pattern.value = value;
}

// update listRef anytime list or selector changes
watchEffect(() => {
  if (props.list) {
    listRef.value = props.selector
      ? props.list.map(props.selector)
      : props.list;
  }
});

watchEffect(() => {
  emit(
    'change',
    filter(pattern.value, listRef.value, {
      caseSensitive: props.caseSensitive.value,
      shouldSort: true
    })
  );
});
</script>

<template lang="pug">
FilterInput(:debounce='debounce', @change='onChange($event)')
</template>
