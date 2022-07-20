import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/dashboard-view.vue';
import PreferencesView from '@/views/preferences-view.vue';
import ConnectionView from '@/views/connection-view.vue';

export const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/preferences',
    name: 'preferences',
    component: PreferencesView
  },
  {
    path: '/connection/:connection',
    name: 'connection',
    component: ConnectionView,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes
});

export default router;
