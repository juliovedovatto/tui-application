import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'offer',
  path: '/offer/:offer',
  component: () => import('@/views/Offer/Offer.vue')
} as RouteRecordRaw
