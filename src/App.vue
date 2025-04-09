<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'App',
  };
</script>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .app {
    height: 100vh;
    background-image: url('./assets/img/background.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
