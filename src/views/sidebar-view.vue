<script setup>
/**
 * The main sidebar view
 */
import { RouterLink } from 'vue-router';
import { useBreeStore } from '@/stores/bree';

const breeStore = useBreeStore();

function displayConnName(conn) {
  return ` ${conn.name}`;
}
</script>

<template lang="pug">
nav.col-md-3.col-lg-2.sidebar.collapse.show.pt-1
  .position-sticky
    ul.nav.flex-column
      li.nav-item
        RouterLink.nav-link(:to='{ name: "dashboard" }')
          .bi.bi-house-door= ' Dashboard'
        ul.nav.flex-column.ms-3(v-if='breeStore.connections.length > 0')
          li.nav-item(v-for='conn in breeStore.connections')
            RouterLink.nav-link(
              :to='{ name: "connection", params: { connection: conn.name } }'
            )
              .bi.bi-card-list= '{{ displayConnName(conn) }}'
</template>

<style lang="scss" scoped>
@import '@/../node_modules/bootstrap/scss/functions';
@import '@/../node_modules/bootstrap-dark-5/scss/dark/functions';
@import '@/../node_modules/bootstrap/scss/variables';
@import '@/../node_modules/bootstrap-dark-5/scss/variables-alt';

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.2);
  background: shade-color($body-bg, $link-shade-percentage);
}

.nav-link {
  color: tint-color($body-color, $link-shade-percentage);
}

.nav-link.active,
.nav-link.router-link-active,
.nav-link:hover {
  color: $body-color;
}

.nav-link.active {
  font-weight: bold;
}

@media (prefers-color-scheme: dark) {
  .sidebar {
    box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.2);
    background: shade-color($body-bg-alt, $link-shade-percentage-alt);
  }

  .nav-link {
    color: shade-color($body-color-alt, $link-shade-percentage-alt);
  }

  .nav-link.active,
  .nav-link.router-link-active,
  .nav-link:hover {
    color: $body-color-alt;
  }
}
</style>
