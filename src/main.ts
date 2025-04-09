import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './icons/iconfont.js';
import i18n from './locals/index.ts';
const app = createApp(App);
app.use(i18n);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.mount('#app');
