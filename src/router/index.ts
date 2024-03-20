import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'

const routes:RouteRecordRaw[] = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/views/dashboard/HDashboard.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/HLogin.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
//   全局前置守卫
router.beforeEach((to, from,next) => {
  console.log(to.path, from.path);
  next()
  // 返回 false 以取消导航
//   return false;
});
//   全局后置钩子
router.afterEach((to, from) => {
    console.log(to.path, from.path);
});
export default router;
