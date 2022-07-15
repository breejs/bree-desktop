<script setup>
import { ref, watchEffect } from 'vue';
import ConnectionUrlInput from './connection-url-input.vue';
import ConnectionTokenInput from './connection-token-input.vue';
import ConnectionNameInput from './connection-name-input.vue';

const props = defineProps({
  /**
   * The value of the form
   * @type {object}
   * @property {string} value.name - The name of the connection
   * @property {string} value.url - The url of the connection
   * @property {string} value.token - The token of the connection
   */
  value: {
    type: Object,
    default: () => ({
      name: 'localhost',
      url: 'http://localhost:62893',
      token: ''
    })
  },
  /**
   * name of connections
   * this is passed on to the ConnectionNameInput component
   * @type {string[]}
   */
  connectionNames: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['submit']);

const form = ref(null);

/** maintain value of name input */
const name = ref(props.value.name ?? '');
/** maintain value of url input */
const url = ref(props.value.url ?? '');
/** maintain value of token input */
const token = ref(props.value.token ?? '');

/** name input ref */
const nameInput = ref(null);
/** url input ref */
const urlInput = ref(null);
/** token input ref */
const tokenInput = ref(null);

/**
 * form validity
 * @type {boolean}
 */
const valid = ref(false);

/**
 * submit form
 * @param {SubmitEvent} event
 */
function onSubmit(event) {
  /**
   * Triggers when form submitted
   * @property {object} value - value of connection
   * @property {string} value.name - The name of the connection
   * @property {string} value.url - url of connection
   * @property {string} value.token - token of connection
   */
  emit('submit', {
    name: name.value,
    url: url.value,
    token: token.value
  });
}

watchEffect(() => {
  // keep valid value up to date
  valid.value =
    tokenInput.value?.valid && urlInput.value?.valid && nameInput.value?.valid;
});
</script>

<template lang="pug">
button.btn.btn-success(
  type='button',
  data-bs-toggle='modal',
  data-bs-target='#add-connection-modal',
  aria-hidden='true'
)
  | Add Connection

#add-connection-modal.modal.fade(tabindex='-1', role='dialog')
  form(novalidate, ref='form', @submit.prevent='onSubmit($event)')
    .modal-dialog
      .modal-content
        .modal-header
          h4.modal-title
            | Add Connection

        .modal-body.container-fluid
          .row.g-3
            .col-12
              ConnectionNameInput(
                ref='nameInput',
                v-model='name',
                :connectionNames='connectionNames'
              )
            .col-12
              ConnectionUrlInput(ref='urlInput', v-model:value='url')
            .col-12
              ConnectionTokenInput(ref='tokenInput', v-model:value='token')

        .modal-footer
          button.btn.btn-danger.mr-3(type='button', data-bs-dismiss='modal') 
            | Cancel
          button.btn.btn-success(
            type='submit',
            :disabled='!valid',
            data-bs-dismiss='modal'
          ) 
            | Add
</template>
