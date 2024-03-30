import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import HLayout from '@/layout/HLayout.vue'
import { useLoginStore } from '@/store/index'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: HLayout,
    redirect: '/dashboard',
    meta: { title: 'route.home', icon: 'HomeFilled', id: '1' },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/HDashboard.vue'),
        meta: { title: 'route.home', icon: 'HomeFilled', id: '1' }
      }
    ]
  },
  {
    path: '/animationMap',
    name: 'AnimationMap',
    component: HLayout,
    redirect: '/animationMap',
    meta: { title: 'route.animation', icon: 'VideoCameraFilled', id: '2' },
    children: [
      {
        path: '/animationMap',
        name: 'AnimationMap',
        component: () => import('@/views/visualization/animation-map/GMap.vue'),
        meta: { title: 'route.animation', icon: 'VideoCameraFilled', id: '2' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/HLogin.vue'),
    meta: { title: 'route.login', icon: 'QuestionFilled', id: '3', hidden: true }
  },
  // {
  //   path: '/visual/echarts/screen',
  //   name: 'HEchartsScreen',
  //   component: () => import('@/views/visualization/HEcharts.vue'),
  //   meta: { title: 'route.echarts',icon: 'Histogram' ,id: "7" , hidden: true }
  // },
  {
    path: '/error',
    name: 'Error',
    component: HLayout,
    meta: { title: 'route.error', icon: 'CircleCloseFilled', id: '4', hidden: true },
    children: [
      {
        path: '/error',
        name: 'Error',
        component: () => import('@/views/error/ErrorPage.vue'),
        meta: { title: 'route.error', icon: 'CircleCloseFilled', id: '4', hidden: true }
      }
    ]
  }
]
// 导入模块路由
// splice(索引位置,0表示不删除任何元素,插入的元素)
const routeModuleFiles = import.meta.glob('./modules/*.ts', { eager: true })
Object.keys(routeModuleFiles).forEach((key: string) => {
  const module: any = routeModuleFiles[key]
  module.default.forEach((route: RouteRecordRaw) => {
    routes.splice(1, 0, route)
  })
})

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//   全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 我们想要在这里使用 store,确保 pinia 实例被激活
  const store = useLoginStore()
  if (to.path === '/login') {
    next()
  } else {
    if (store.username) {
      next()
    } else {
      next('/login')
    }
  }
})
//   全局后置钩子
router.afterEach(() => {
  NProgress.done()
})
export default router
