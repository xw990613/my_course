import axios from 'axios';
import { ElMessage } from 'element-plus';
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
      const message = res.message || '请求出错';

      // 可以根据具体status进一步处理
      switch (res.status) {
        case 401:
          ElMessage.success('登录失效，请重新登录');
          // 清理登录状态或跳转登录页
          break;
        case 403:
          ElMessage.success('权限不足');
          break;
        case 500:
          ElMessage.success('服务器错误');
          break;
        default:
          ElMessage.success(message);
      }

      return new Promise(() => {}); // 返回一个空的 Promise，避免未处理的 Promise 拦截器错误
    }

    return res;
  },
  error => {
    if (axios.isCancel(error)) {
      console.warn('请求被取消：', error.message);
      ElMessage.error('请求被取消:' + error.message);
    } else {
      ElMessage.error('网络异常，请稍后再试');
    }
    return new Promise(() => {}); // 返回一个空的 Promise，避免未处理的 Promise 拦截器错误
  },
);

export default service;
