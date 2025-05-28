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
      <el-menu-item index="/layout/allCourse">
        {{ $t('homePage.Courses') }}
      </el-menu-item>
      <el-menu-item index="/layout/questionnaire"> 调查问卷 </el-menu-item>
      <el-menu-item index="/layout/school">
        {{ $t('homePage.PartnerSchool') }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'home-left',
  };
</script>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const activeIndex = ref(route.path);
  // 监听路由变化，更新activeIndex
  watch(
    () => route.path,
    newPath => {
      activeIndex.value = newPath;
      console.log('路由变化更新activeIndex:', newPath);
    },
  );
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
  ::v-deep(.el-menu-item:hover) {
    background-color: transparent !important;
  }
  ::v-deep(.el-menu--horizontal > .el-menu-item.is-active) {
    border-bottom: none !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }
  ::v-deep(.el-menu--horizontal > .el-menu-item) {
    border-bottom: none !important;
  }
</style>
