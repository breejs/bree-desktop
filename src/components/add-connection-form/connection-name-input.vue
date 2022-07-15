<script setup>
import { onMounted, ref, watchEffect, computed } from 'vue';
import isSANB from 'is-string-and-not-blank';
import useDebounceInput from '@/composables/debounce-input';

const props = defineProps({
  connectionNames: {
    type: Array,
    default: () => []
  },
  value: {
    type: String,
    default: 'localhost'
  }
});

const emit = defineEmits(['update:value']);

const input = ref(null);

const { inputValue, valid, classes } = useDebounceInput(
  props.value,
  'localhost',
  input,
  emit,
  (value) => isSANB(value) && !props.connectionNames?.includes(value)
);

defineExpose({ valid });
</script>

<template lang="pug">
.form-floating
  input#connection-name-input.form-control(
    name='name',
    type='text',
    placeholder='',
    required,
    v-model='inputValue',
    :class='classes',
    ref='input'
  )
  label(for='connection-name-input')
    | Name*
  .invalid-feedback
    | Enter a valid name that is unique
</template>
