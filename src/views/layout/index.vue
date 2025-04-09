<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <HomeLeft />
      </div>
      <div class="right">
        <homeRight />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: 'my-home',
}
</script>

<script setup lang="ts">
import HomeLeft from './header/homeLeft.vue'
import homeRight from './header/homeRight.vue'
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    flex: 1;
    min-width: 0; // 防止超出
  }

  .right {
    flex-shrink: 0;
  }
  ::v-deep(.el-menu--horizontal.el-menu) {
    border-bottom: none !important;
  }
}
</style>
