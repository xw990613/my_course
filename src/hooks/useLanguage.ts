// hooks/useLanguage.ts
import { watch } from 'vue';
import { useAuthStore } from '@/stores/auth';

export function useLanguage(onLanguageChange: () => void) {
  const languageStore = useAuthStore();

  // 监听语言变化
  watch(
    () => languageStore.lang,
    () => {
      // 语言变化，触发传入的回调，页面重新调用接口
      onLanguageChange();
    },
    { immediate: false },
  );

  return {
    currentLanguage: languageStore.lang,
  };
}
