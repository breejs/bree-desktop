<script setup>
import { computed, onMounted, ref } from 'vue';
import omit from 'lodash/omit';

import { useBreeStore } from '@/stores/bree';
import LoadingSpinner from '@/components/loading-spinner.vue';

const props = defineProps({
  /**
   * the connection name
   *
   * @type {string}
   */
  name: {
    type: String,
    required: true
  },

  /**
   * the config of the connection
   *
   * @type {BreeConfig}
   */
  config: {
    type: [Object, undefined],
    default: undefined
  }
});

const modal = ref(null);

const breeStore = useBreeStore();

const breeConfig = computed(() =>
  props.config
    ? omit(props.config, [
        'logger',
        'jobs',
        'errorHandler',
        'workerMessageHandler'
      ])
    : undefined
);

onMounted(() => {
  modal.value.addEventListener('show.bs.modal', () => {
    breeStore.getConfig(props.name);
  });
});
</script>

<template lang="pug">
.modal.fade(
  ref='modal',
  :id='"config-modal-" + name',
  tabindex='-1',
  role='dialog'
)
  .modal-dialog.modal-xl
    .modal-content
      .modal-header
        h5.modal-title
          | Config for "{{ name }}"

        LoadingSpinner(:name='name')

        button.btn.btn-close(
          type='button',
          data-bs-dismiss='modal',
          aria-label='Close'
        )

      .modal-body
        table.table.table-striped.table-hover
          thead
            tr
              th(scope='col')
                | Key
              th(scope='col')
                | Value
          tbody
            tr(v-for='(value, key) in breeConfig')
              td
                | {{ key }}
              td
                | {{ value }}
</template>
