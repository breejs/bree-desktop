<script setup>
import { ref } from 'vue';
import debounce from 'lodash/debounce';

const props = defineProps({
  // debounce for onInput check
  // (in milliseconds)
  debounce: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['change']);

const input = ref(null);

function onInput() {
  emit('change', input.value.value);
}

const debounceInput = debounce(onInput, props.debounce);

function onClearClick() {
  input.value.value = null;
  onInput();
}
</script>

<template lang="pug">
.input-group.mb-3
  input#filter-input.form-control(
    type='text',
    placeholder='Filter',
    @input='debounceInput()',
    ref='input'
  )
  button.btn.btn-outline-secondary(type='button', @click='onClearClick()')
    i.bi.bi-x
</template>
