import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/dashboard-view.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    }
  ]
});

export default router;
