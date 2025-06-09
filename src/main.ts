import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './icons/iconfont.js';
import i18n from './locals/index.ts';
import Vue3CountryIntl from 'vue3-country-intl';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import * as echarts from 'echarts';
// 引入css
import 'vue3-country-intl/lib/vue3-country-intl.css';
const app = createApp(App);
app.config.globalProperties.$echarts = echarts;
app.use(i18n);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(ElementPlus);
// 全局注册组件
app.component(Vue3CountryIntl.name, Vue3CountryIntl);

app.mount('#app');
