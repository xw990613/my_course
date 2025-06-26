import { createRouter, createWebHistory } from 'vue-router';

// 首页静态加载 不通过懒加载 提高首屏加载速度
import Home from '@/views/home/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login', // 默认跳转到登录页
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/login.vue'),
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/views/login/register.vue'),
    },
    {
      name: 'layout',
      path: '/layout',
      component: () => import('@/views/layout/index.vue'),
      meta: { requiresAuth: true },
      redirect: '/layout/home',
      children: [
        {
          name: 'home',
          path: 'home',
          component: Home,
          meta: { noFooter: true, requiresAuth: true },
        },
        {
          name: 'questionnaire',
          path: 'questionnaire',
          component: () => import('@/views/questionnaire/index.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'allCourse',
          path: 'allCourse',
          component: () => import('@/views/allCourse/index.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'personalCenter',
          path: 'personalcenter',
          component: () => import('@/views/personalcenter/index.vue'),
          meta: { requiresAuth: true },
          redirect: '/layout/personalCenter/personalInformation',
          children: [
            {
              name: 'personalInformation',
              path: 'personalInformation',
              meta: { requiresAuth: true },
              component: () =>
                import('@/views/personalcenter/personalInformation/index.vue'),
            },
            {
              name: 'metricAnalysis',
              path: 'metricAnalysis',
              meta: { requiresAuth: true },
              component: () =>
                import('@/views/personalcenter/metricAnalysis/index.vue'),
            },
            {
              name: 'myCourse',
              path: 'myCourse',
              meta: { requiresAuth: true },
              component: () =>
                import('@/views/personalcenter/myCourse/index.vue'),
            },
            {
              name: 'feedbackCenter',
              path: 'feedbackCenter',
              meta: { requiresAuth: true },
              component: () =>
                import('@/views/personalcenter/feedbackCenter/index.vue'),
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
