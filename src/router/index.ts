import { createRouter, createWebHistory } from 'vue-router';

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
      redirect: '/layout/home',
      children: [
        {
          name: 'home',
          path: 'home',
          component: () => import('@/views/home/index.vue'),
        },
        {
          name: 'questionnaire',
          path: 'questionnaire',
          component: () => import('@/views/questionnaire/index.vue'),
        },
        {
          name: 'allCourse',
          path: 'allCourse',
          component: () => import('@/views/allCourse/index.vue'),
        },
        {
          name: 'school',
          path: 'school',
          component: () => import('@/views/school/index.vue'),
        },
        {
          name: 'personalCenter',
          path: 'personalcenter',
          component: () => import('@/views/personalcenter/index.vue'),
          redirect: '/layout/personalCenter/personalInformation',
          children: [
            {
              name: 'personalInformation',
              path: 'personalInformation',
              component: () =>
                import('@/views/personalcenter/personalInformation/index.vue'),
            },
          ],
        },
      ],
    },
  ],
});

export default router;
