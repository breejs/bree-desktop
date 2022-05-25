<script setup>
import { RouterView } from 'vue-router';

import TheSideNav from './components/the-side-nav.vue';
</script>

<template lang="pug">
main
  TheSideNav

  .p-3.mb-auto.w-100
    RouterView
</template>

<style lang="scss">
@import '@/assets/scss/base.scss';

#app {
  max-width: 1920px;
  margin: 0 auto;

  font-weight: normal;
}

main {
  display: flex;
  flex-wrap: nowrap;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
