<template>
  <div class="outer">
    <el-input
      v-if="route.fullPath === '/layout/allCourse'"
      v-model="input"
      style="width: 240px; margin-right: 20px"
      :placeholder="$t('common.inputPlaceholder')"
      :suffix-icon="Search"
      @keyup.enter="handelChange"
    />
    <el-dropdown @command="changeType" trigger="click">
      <div class="lang-selector">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wangluo"></use>
        </svg>
        <span class="el-dropdown-link">
          {{ currentLanguageText }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
          <el-dropdown-item command="my">Melayu</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown @command="jumpPage" trigger="click">
      <div class="lang-selector">
        <span class="el-dropdown-link">
          <el-avatar :src="avatarUrl" />
        </span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            command="person_info"
            @click="router.push('/layout/personalCenter')"
            >{{ $t('homePage.personInfo') }}</el-dropdown-item
          >
          <el-dropdown-item command="exit" @click="userLogout">{{
            $t('homePage.quit')
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup name="homeRight">
  import { ref, computed, watch } from 'vue';
  import { Search } from '@element-plus/icons-vue';
  import { ArrowDown } from '@element-plus/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { useAuthStore } from '@/stores/auth';
  import emitter from '@/utils/emitter';
  import { useRouter, useRoute } from 'vue-router';
  const route = useRoute();
  const { locale } = useI18n();
  const auth = useAuthStore();
  const input = ref('');
  const router = useRouter();
  const languageMap = {
    zh: '中文',
    en: 'English',
    my: 'Melayu',
  } as const;
  type LangKey = keyof typeof languageMap;
  let currentLanguage = (localStorage.getItem('lang') as LangKey) || 'zh';
  console.log(route.fullPath, '@@@');
  // 👇 默认头像地址
  const DEFAULT_AVATAR =
    'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
  const avatarUrl = ref(DEFAULT_AVATAR);
  // 页面加载后侦听 userInfo 自动赋值
  watch(
    () => auth.userInfo,
    val => {
      if (val) {
        avatarUrl.value =
          import.meta.env.VITE_API_BASE_URL + val.user_pic || DEFAULT_AVATAR;
      }
    },
    { immediate: true },
  );
  // 计算显示的文字
  const currentLanguageText = computed(() => languageMap[currentLanguage]);

  function changeType(value: string) {
    currentLanguage = value as LangKey;
    locale.value = value;
    auth.lang = value;
    localStorage.setItem('lang', value);
    // 刷新页面，重新加载所有内容
    window.location.reload();
  }
  function jumpPage(value: string) {
    console.log(value);
  }
  // 退出登录
  function userLogout() {
    auth.userLogout();
  }
  function handelChange() {
    emitter.emit('sendInput', { query: input.value });
  }
</script>
<style scoped lang="scss">
  .outer {
    display: flex;
    align-items: center;
  }

  .lang-selector {
    display: flex;
    align-items: center;
    cursor: pointer;

    .icon {
      width: 1.4em;
      height: 1.4em;
      margin-right: 6px;
      fill: currentColor;
    }

    .el-dropdown-link {
      display: flex;
      align-items: center;
      font-size: 16px;
    }
  }
  .el-dropdown:last-child {
    margin-left: 20px;
  }
</style>
