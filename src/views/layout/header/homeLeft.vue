<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    style="max-width: 800px"
    router
  >
    <el-menu-item index="/layout/home">首页</el-menu-item>
    <el-menu-item index="/layout/school">合作院校</el-menu-item>
    <el-menu-item index="3">雨课堂</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
export default {
  name: 'home-left',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('/layout/home')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style scoped lang="scss"></style>
