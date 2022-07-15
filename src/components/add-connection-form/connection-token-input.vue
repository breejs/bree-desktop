<script setup>
import { ref } from 'vue';
import useDebounceInput from '@/composables/debounce-input';

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:value']);

const input = ref(null);

const { inputValue, valid, classes } = useDebounceInput(
  props.value,
  '',
  input,
  emit,
  (value) => value === '' || /^[\w-=]+\.[\w-=]+\.?[\w-.+/=]*$/.test(value)
);

defineExpose({ valid });
</script>

<template lang="pug">
.form-floating
  input#connection-token-input.form-control(
    name='token',
    type='text',
    placeholder='',
    v-model='inputValue',
    :class='classes',
    ref='input'
  )
  label(for='connection-token-input')
    | Token
  .invalid-feedback
    | Enter a valid JWT token
</template>
