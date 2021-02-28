import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/offer/:offer',
  component: () => import('@/views/Offer/Offer.vue')
} as RouteRecordRaw
