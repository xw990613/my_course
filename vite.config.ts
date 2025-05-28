import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import VitePluginExtend from 'vite-plugin-vue-setup-extend';

// https://vite.dev/config/

// export default defineConfig({
//   plugins: [vue(), vueDevTools(), VitePluginExtend()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//       '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
//     },
//   },
// });
// ✅ 添加：loadEnv 加载 .env 文件
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // 加载对应环境变量

  return {
    plugins: [vue(), vueDevTools(), VitePluginExtend()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
    },
    // server: {
    //   // host: '0.0.0.0', // 可选，让局域网访问
    //   // port: 5173, // 可选，默认就是 5173
    //   proxy: {
    //     // ✅ 本地开发代理 API 请求
    //     '/acting': {
    //       target: 'http://127.0.0.1:3007', // 来自对应的 `.env` 文件
    //       changeOrigin: true,
    //       rewrite: path => path.replace(/^\/acting/, ''),
    //     },
    //   },
    // },
  };
});
