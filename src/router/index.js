import { createRouter, createWebHistory } from 'vue-router'
import Checkout from '../layouts/Checkout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'checkout',
      component: Checkout,
      meta: { position: 'left' },
    },
    {
      path: '/order-complete/:transactionId',
      name: 'order-complete',
      component: () => import('../layouts/OrderComplete.vue'),
      meta: { position: 'center' },
    },
  ]
})

export default router