import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'Home', component: () => import('pages/HomePage.vue') }, {
      path: '/profile',
      name: 'Profile',
      component: () => import('pages/ProfilePage.vue'),
    }],
  },
  {
    path: '/donate',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'Donate', component: () => import('pages/DonatePage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
