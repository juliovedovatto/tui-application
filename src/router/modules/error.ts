import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: () => import('@/views/Error/NotFound.vue'),
} as RouteRecordRaw


