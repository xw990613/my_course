import request from '@/utils/request';
// 用户注册接口类型:
// 用户注册请求体类型
export interface RegisterRequest {
  password: string;
  phone?: string;
}

// 用户注册响应体类型
export interface RegisterResponse {
  status: number;
  message: string;
}
// 用户注册
export function user_register(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  return request({
    url: '/api/register',
    method: 'post',
    data,
  });
}

// 登录请求体类型
export interface LoginRequest {
  phone_number: string;
  password: string;
}

// 登录响应体类型
export interface LoginResponse {
  status: number;
  message: string;
  token: string; // 假设登录成功会返回 token
}

// 用户登录
export function user_login(data: LoginRequest): Promise<LoginResponse> {
  return request({
    url: '/api/login',
    method: 'post',
    data,
  });
}

// 获取用户信息
export function user_getInfo() {
  return request({
    url: '/userinfo',
    method: 'get',
  });
}
// 修改用户信息
export function user_updateInfo(data: any) {
  return request({
    url: '/changeuserInfo',
    method: 'post',
    data,
  });
}

// 收藏课程
export function collectCourse(data: any) {
  return request({
    url: '/user/favoriteCourse',
    method: 'post',
    data,
  });
}

// 获取课程收藏列表
export function getCollectCourse() {
  return request({
    url: '/getMyCourses',
    method: 'get',
  });
}

// 取消收藏
export function cancelCollectCourse(data: any) {
  return request({
    url: '/cancelCollectCourse',
    method: 'post',
    data,
  });
}
