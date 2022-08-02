<script setup>
import { ref, computed } from 'vue';

import LoadingSpinner from '../loading-spinner.vue';
import LogListItem from './log-list-item.vue';
import { useBreeStore } from '@/stores/bree';

const props = defineProps({
  /**
   * the job name
   *
   * @type {(string|undefined)}
   */
  jobName: {
    type: String
  },
  /**
   * the kind
   *
   * @type {('connection'|'job')}
   * @default 'job'
   */
  kind: {
    type: String,
    validator(value) {
      return ['connection', 'job'].includes(value);
    },
    default: 'job'
  },
  /**
   * connection name
   *
   * @type {string}
   */
  connectionName: {
    type: String,
    required: true
  }
});

const breeStore = useBreeStore();

/** Modal ref */
const modal = ref(null);

/** Modal id */
const id = computed(() => {
  return `logs-modal-${props.kind === 'connection' ? 'connection-' : ''}${
    props.jobName ? props.jobName : props.connectionName
  }`;
});

/** LoadingSpinner name */
const loadingSpinnerName = computed(() => {
  return `logs:${props.connectionName + ':'}${props.name}`;
});

const logs = computed(() => {
  return breeStore.logs(props.connectionName, props.jobName);
});
</script>

<template lang="pug">
.modal.fade(ref='modal', :id='id', tabindex='-1', role='dialog')
  .modal-dialog.modal-xl
    .modal-content
      .modal-header
        h5.modal-title
          | Logs for "{{ jobName ? jobName : connectionName }}"

        button.btn.btn-danger.btn-sm.ms-1(
          @click='breeStore.clearLogs(connectionName, jobName)'
        )
          | Clear logs

        LoadingSpinner.ms-1(:name='loadingSpinnerName')

        button.btn.btn-close(
          type='button',
          data-bs-dismiss='modal',
          aria-label='Close'
        )

      .modal-body
        ul.list-group.list-group-flush
          template(v-if='logs?.length > 0')
            template(v-for='log in logs')
              LogListItem(
                :log='log',
                :jobName='jobName',
                :connectionName='connectionName'
              )

          template(v-else)
            | No logs
</template>
