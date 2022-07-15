<script setup>
import { ref, computed } from 'vue';

import useDebounceInput from '@/composables/debounce-input';

const props = defineProps({
  value: {
    type: String,
    default: 'http://localhost:62893'
  }
});

const emit = defineEmits(['update:value']);

const input = ref(null);

const { inputValue, valid, classes } = useDebounceInput(
  props.value,
  'http://localhost:62893',
  input,
  emit,
  (value) =>
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z\d.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z\d.-]+)((?:\/[+~%/.\w-_]*)?\??[-+=&;%@.\w_]*#?[.!/\\\w]*)?)/.test(
      value
    )
);

defineExpose({
  valid
});
</script>

<template lang="pug">
.form-floating
  input#connection-url-input.form-control(
    name='url',
    type='url',
    placeholder='http://localhost:62893',
    required,
    v-model='inputValue',
    :class='classes',
    ref='input'
  )
  label(for='connection-url-input')
    | URL*
  .invalid-feedback
    | Enter a valid URL
</template>
