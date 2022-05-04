<script setup>
import { RouterLink } from 'vue-router';
</script>

<template lang="pug">
.d-flex.flex-column.flex-shrink-0.p-3.sidebar.border-right
  nav.nav.nav-pills.flex-column.mb-auto
    RouterLink.nav-link(:to='{ name: "dashboard" }')= 'Dashboard'
    RouterLink.nav-link(to='/about')= 'About'
</template>

<style lang="scss" scoped>
.sidebar {
  width: 280px;
}
</style>
