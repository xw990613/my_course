<template>
  <div class="personalCenter">
    <el-col :span="3">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>个人资料</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><document /></el-icon>
          <span>我的课程</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>我的课程</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'personalCenter',
  };
</script>

<script setup lang="ts">
  import { Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue';
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
</script>

<style scoped lang="scss">
  .personalCenter {
    max-width: 1200px;
    width: auto;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    .page {
      width: 100%;
      margin-left: 50px;
    }
  }
  ::v-deep(.el-col-3) {
    background: #fff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  }
</style>
