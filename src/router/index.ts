import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/layout'  // 默认跳转到登录页
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/views/login/register.vue')
    },
    {
      name: 'layout',
      path: '/layout',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/layout/home',
      children: [
        {
          name: 'home',
          path: 'home',
          component: () => import('@/views/home/index.vue'),
        },
        {
          name: 'school',
          path: 'school',
          component: () => import('@/views/school/index.vue'),
        },
      ]
    }
  ],
})

export default router
