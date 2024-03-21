import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import HLayout from '@/layout/HLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: HLayout,
    redirect: '/Dashboard',
    children: [
      {
        path: '/Dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/HDashboard.vue'),
        meta: {
          title: '首页',
          icon: 'ChatRound',
          roles: ['admin', 'editor'],
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/HLogin.vue'),
  },
  {
    path: '/error',
    name: 'Error404',
    component: HLayout,
    children: [
      {
        path: '/error',
        name: 'Error404',
        component: () => import('@/views/error/Error404.vue'),
        meta: {
          title: 'Error',
          icon: 'dashboard',
          roles: ['admin', 'editor'],
        },
      },
    ],
  },
]
// 导入模块路由
// splice(索引位置,0表示不删除任何元素,插入的元素)
const routeModuleFiles = import.meta.glob('./modules/*.ts', { eager: true })
Object.keys(routeModuleFiles).forEach((key: string) => {
  const module: any = routeModuleFiles[key]
  module.default.forEach((route: RouteRecordRaw) => {
    routes.splice(1,0,route)
  })
})

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
//   全局前置守卫
router.beforeEach((to, from, next) => {
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
})
//   全局后置钩子
router.afterEach(() => {
  NProgress.done()
})
export default router
