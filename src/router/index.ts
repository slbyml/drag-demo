import {createRouter, createWebHashHistory} from 'vue-router'
// 路由信息
const routes = [
  {
      path: "/",
      name: "Index",
      component:  () => import('../views/index/index.vue'),
  },
  {
      path: "/iframe",
      name: "iframe",
      component:  () => import('../views/iframe/index.vue'),
  },
];

// 导出路由
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;