<script setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import SidebarView from '@/views/sidebar-view.vue';
import AddConnectionForm from '@/components/add-connection-form/add-connection-form.vue';

import useTauriNewConnection from '@/composables/tauri-new-connection';

const route = useRoute();

const isPreferences = computed(() => route.name === 'preferences');

const {
  showConnectionForm,
  connectionNames,
  onConnectionAdded,
  onModalHidden
} = useTauriNewConnection();
</script>

<template lang="pug">
.container-fluid
  .row
    SidebarView.col(v-if='!isPreferences')

    main.col.col-md-9.col-lg-10.px-md-4.ms-sm-auto.pt-3
      AddConnectionForm(
        v-if='showConnectionForm',
        :connectionNames='connectionNames',
        :show='showConnectionForm',
        @submit='onConnectionAdded',
        @modalHidden='onModalHidden'
      )

      RouterView
</template>

<style lang="scss">
@import '@/assets/scss/base.scss';

#app {
  max-width: 1920px;
  margin: 0;

  font-weight: normal;
}
</style>
