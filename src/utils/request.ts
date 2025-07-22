import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { i18nInstance } from '@/locals/index.ts';

const t = i18nInstance.global.t;
// 创建实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 环境变量配置
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 设置token
    const token = localStorage.getItem('token');
    const language = localStorage.getItem('lang'); // 从 localStorage 获取语言设置，默认 'en'
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // 添加 Accept-Language 头部，支持多语言
    config.headers['Accept-Language'] = language;
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 业务状态码统一处理
    if (res.status !== 0) {
      const message = res.message;
      ElMessage.success(message);
      return new Promise(() => {}); // 返回一个空的 Promise，避免未处理的 Promise 拦截器错误
    }
    return res;
  },
  error => {
    if (axios.isCancel(error)) {
      ElMessage.error(t('common.RequestCanceled') + error.message);
    } else if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        ElMessage.error(t('common.loginInvalid'));
        localStorage.removeItem('token');
        router.push({
          path: '/login',
          query: { redirect: router.currentRoute.value.fullPath },
        });
      } else if (status === 403) {
        ElMessage.error(t('common.NoPermission'));
      } else if (status >= 500) {
        ElMessage.error(t('common.ServerError'));
      } else {
        ElMessage.error(t('common.RequestFailed'));
      }
    } else {
      ElMessage.error(t('common.NetworkAbnormal'));
    }
    return new Promise(() => {}); // 返回一个空的 Promise，避免未处理的 Promise 拦截器错误
  },
);

export default service;
