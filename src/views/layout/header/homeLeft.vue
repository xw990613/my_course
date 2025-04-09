<template>
  <div class="outer">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-zaixianjiaoyu"></use>
    </svg>
    <span class="outer_title">学堂在线</span>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      style="max-width: 800px"
      router
      :ellipsis="false"
    >
      <el-menu-item index="/layout/home">
        {{ $t('homePage.homePage') }}
      </el-menu-item>
      <el-menu-item index="/layout/school">
        {{ $t('homePage.PartnerSchool') }}
      </el-menu-item>
      <el-menu-item index="3">雨课堂</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'home-left',
  };
</script>

<script lang="ts" setup>
  import { ref } from 'vue';

  const activeIndex = ref('/layout/home');
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
</script>
<style scoped lang="scss">
  .outer {
    display: flex;
    align-items: center;
    &_title {
      font-size: 1.5em;
      color: rgb(113, 112, 113);
      line-height: 1;
    }
  }
  .icon {
    width: 2em;
    height: 2em;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
    margin-right: 8px; // 图标和文字间距
  }
</style>
