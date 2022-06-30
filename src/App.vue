<script setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import SidebarView from '@/views/sidebar-view.vue';

const route = useRoute();

const showNav = computed(() => route.name !== 'preferences');
</script>

<template lang="pug">
.container-fluid
  .row
    SidebarView.col(v-if='showNav')

    main.col.col-md-9.col-lg-10.px-md-4.ms-sm-auto.pt-3
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
