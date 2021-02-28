import { createRouter, createWebHistory } from "vue-router";

import guards from './guards'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
});

guards?.before?.forEach(g => router.beforeEach(g))
guards?.resolve?.forEach(g => router.beforeResolve(g))
guards?.after?.forEach(g => router.afterEach(g))

export default router;
