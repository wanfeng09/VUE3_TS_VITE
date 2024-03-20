import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import HLayout from '@/layout/HLayout.vue'

const routes:RouteRecordRaw[] = [
  {
    path: "/",
    name: "Dashboard",
    component: HLayout,
    redirect: "/Dashboard",
    children: [
      {
        path: "/Dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/HDashboard.vue"),
        meta: {
          title: "首页",
          icon: "dashboard",
          roles: ["admin", "editor"]
        }
      }]
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
  if (to.name !== from.name) {
    NProgress.start()
  }

  window.document.title = to.meta.title
    ? `${to.meta.title} | offbeat-ui`
    : 'offbeat-ui'

  // const isLogin = getToken()
  const isLogin = true
  if (isLogin) {
    if (to.name === 'login') {
      next('/')
    } else {
      next()
    }
  } else if (to.name !== 'login') {
    next('/login')
  } else {
    next()
  }
});
//   全局后置钩子
router.afterEach(() => {
  NProgress.done()
});
export default router;
