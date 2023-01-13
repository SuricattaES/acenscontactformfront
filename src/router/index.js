import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // Main web layout
  {
    path: '/:catchAll(.*)',
    name: 'Inicio',
    component: () => import(/* webpackChunkName: "main" */ '@/components/formAcens.vue'),
    // children: [{ path: "", component: () => import("pages/Index.vue") }],
    meta: {
        layout: 'BasicLayout',
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
