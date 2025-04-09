import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import VitePluginExtend from 'vite-plugin-vue-setup-extend';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), VitePluginExtend()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },
});
