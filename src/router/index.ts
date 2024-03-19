import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/views/dashboard/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
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
