<script setup>
import { ref } from 'vue';
import useDebounceInput from '@/composables/debounce-input';

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  defaultValue: {
    type: String,
    default: ''
  },
  isValid: {
    type: Function,
    default: () => true
  }
});

const emit = defineEmits(['update:value']);

const input = ref(null);

const { inputValue, valid, classes } = useDebounceInput(
  props.value,
  props.defaultValue,
  input,
  emit,
  props.isValid
);

defineExpose({ valid });
</script>

<template lang="pug">
input(
  data-testid='input',
  name='name',
  type='text',
  placeholder='',
  v-model='inputValue',
  :class='classes',
  ref='input'
)
</template>
