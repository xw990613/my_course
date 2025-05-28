import { defineStore } from 'pinia';
import { user_register, user_login, user_getInfo } from '@/api/user';
import type { LoginRequest, RegisterRequest } from '@/api/user';
import { ElMessage } from 'element-plus';
import router from '@/router';
export const useAuthStore = defineStore('auth', {
  state() {
    return {
      token: localStorage.getItem('token') || '',
      lang: localStorage.getItem('lang'),
      userInfo: null,
    };
  },
  actions: {
    // 登录
    async login(data: LoginRequest) {
      try {
        const result = await user_login(data);
        localStorage.setItem('token', result.token);
        ElMessage({
          message: result.message,
          type: 'success',
        });
        await this.getUserInfo();
        // 登录成功后调用获取用户信息
        router.push('/layout');
      } catch (err: any) {
        ElMessage.error(err.message || '登录失败');
      }
    },
    // 注册
    async register(data: RegisterRequest) {
      try {
        // 发送注册请求
        const result = await user_register(data);
        ElMessage({
          message: result.message,
          type: 'success',
        });
      } catch (err: any) {
        ElMessage.error(err.message || '注册失败');
      }
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        const result = await user_getInfo();
        this.userInfo = result.data;
      } catch (err: any) {
        ElMessage.error(err.message || '获取用户信息失败');
      }
    },
    // 退出登录
    userLogout() {
      localStorage.removeItem('token');
      this.token = '';
      this.userInfo = null;
      router.push('/login');
    },
  },
});
