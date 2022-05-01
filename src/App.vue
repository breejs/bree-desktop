<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from '@/components/hello-world.vue';
</script>

<template>
<!--
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  -->
  <img
    alt="Bree logo"
    class="img-fluid"
    src="@/assets/bree.png"
  />
  <p> Test text </p>
</template>

<style lang="scss">
@import '@/assets/scss/base.scss';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}
</style>
