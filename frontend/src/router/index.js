import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import TransactionsPage from '../pages/TransactionsPage.vue';
import SavingsGoalsPage from '../pages/ObjectifsPage.vue';

const routes = [
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  {
    path: '/',
    name: 'dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: TransactionsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/savings-goals',
    name: 'savings-goals',
    component: SavingsGoalsPage,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuth = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuth) {
    return next({ name: 'login' });
  }
  if ((to.name === 'login' || to.name === 'register') && isAuth) {
    return next({ name: 'dashboard' });
  }
  next();
});

export default router;
