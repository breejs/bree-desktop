import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/dashboard-view.vue';
import PreferencesView from '@/views/preferences-view.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/preferences',
      name: 'preferences',
      component: PreferencesView
    }
  ]
});

export default router;
