<template>
  <div class="app">
    <el-config-provider :locale="lang">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'App',
  };
</script>

<script setup lang="ts">
  import { ElConfigProvider } from 'element-plus';
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
  import enEn from 'element-plus/es/locale/lang/en';
  import { useI18n } from 'vue-i18n';
  import { ref, watch } from 'vue';
  const { locale } = useI18n();
  // eslint-disable-next-line prefer-const
  let lang = ref({});
  // 监听 locale.value 的变化，动态更新 Element Plus 语言
  watch(
    () => locale.value, // 监听语言变化
    newLang => {
      if (newLang === 'zh') {
        lang.value = zhCn;
      } else if (newLang === 'en') {
        lang.value = enEn;
      }
    },
    { immediate: true }, // 页面加载时立即执行一次
  );
</script>

<style scoped lang="scss"></style>
