<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  /**
   * the job name
   *
   * @type {string}
   */
  jobName: {
    type: String
  },
  /**
   * the connection name
   *
   * @type {string}
   */
  connectionName: {
    type: String,
    required: true
  },
  /**
   * the log
   *
   * @type {Log}
   */
  log: {
    type: Object,
    required: true
  }
});

const typeClass = computed(() => {
  let c = {};

  switch (props.log.type) {
    case 'worker created': {
      c = { 'badge-success': true };
      break;
    }

    case 'worker deleted': {
      c = { 'badge-warning': true };
      break;
    }

    case 'worker message': {
      c = { 'badge-info': true };
      break;
    }

    case 'worker error': {
      c = { 'badge-danger': true };
      break;
    }

    default: {
      throw new Error('Unknown log type');
    }
  }

  return c;
});
</script>

<template lang="pug">
li.list-group-item
  span.badge.badge-secondary
    | {{ dayjs(log.date).format('MM/DD/YYYY HH:mm:ssZ') }}
  span.badge.ms-1(:class='typeClass')
    | {{ log.type }}
  span.badge.badge-primary.ms-1
    | {{ connectionName }}
  span.badge.badge-primary.ms-1(v-if='log.name')
    | {{ log.name }}
  span.ms-1(v-if='log.message')
    | {{ log.message }}
</template>

<style scoped>
.list-group-item {
  background-color: inherit;
}

.badge-primary {
  background-color: var(--bs-primary);
  color: var(--bs-white);
}

.badge-secondary {
  background-color: var(--bs-secondary);
  color: var(--bs-white);
}

.badge-success {
  background-color: var(--bs-success);
  color: var(--bs-black);
}

.badge-warning {
  background-color: var(--bs-warning);
  color: var(--bs-black);
}

.badge-info {
  background-color: var(--bs-info);
  color: var(--bs-black);
}

.badge-danger {
  background-color: var(--bs-danger);
  color: var(--bs-black);
}
</style>
