import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/orders'
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/pages/OrdersPage.vue'),
      meta: { title: 'Orders' }
    },
    {
      path: '/orders/:id',
      name: 'order-detail',
      component: () => import('@/pages/OrderDetailPage.vue'),
      meta: { title: 'Order Detail', parent: 'orders' }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/pages/SettingsPage.vue'),
      meta: { title: 'Settings' }
    }
  ]
})

export default router
