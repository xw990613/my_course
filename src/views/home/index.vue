<template>
  <div class="home">
    <Carousel></Carousel>
    <Partnter></Partnter>
  </div>
</template>

<script lang="ts">
export default {
  name: 'my-home',
}
</script>

<script setup lang="ts">
import Carousel from './Carousel.vue'
import Partnter from './Partnter.vue'
</script>

<style scoped lang="scss"></style>
