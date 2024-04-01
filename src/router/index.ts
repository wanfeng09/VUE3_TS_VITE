import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import HLayout from '@/layout/HLayout.vue'
import { useLoginStore } from '@/store/index'
/**
 * @description 路由配置
 * redirect string 重定向，控制breadcrumb
 * meta.hidden boolean 控制是否显示菜单栏
 * hasOnlyChildren boolean 只有一个子级
 *
 */
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
        meta: { title: 'route.home', icon: 'HomeFilled', id: '1-1' }
      }
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/HLogin.vue'),
    meta: { title: 'route.login', icon: 'QuestionFilled', id: '3', hidden: true }
  }
  // {
  //   path: '/visual/echarts/screen',
  //   name: 'HEchartsScreen',
  //   component: () => import('@/views/visualization/HEcharts.vue'),
  //   meta: { title: 'route.echarts',icon: 'Histogram' ,id: "7" , hidden: true }
  // },
]
// 导入模块路由
// splice(索引位置,0表示不删除任何元素,插入的元素)
const routeModuleFiles = import.meta.glob('./modules/*.ts', { eager: true })
Object.keys(routeModuleFiles).forEach((key: string) => {
  const module = routeModuleFiles[key]
  routes.splice(1, 0, (module as { default: RouteRecordRaw }).default)
})

// 异步模块 [导出，sidebar使用]
export const asyncRouter: RouteRecordRaw[] = [
  {
    path: '/map',
    name: 'Map',
    component: HLayout,
    redirect: 'noRedirect',
    meta: { title: 'route.animation', icon: 'VideoCameraFilled', id: '2', hasOnlyChildren: true },
    children: [
      {
        path: '/animationMap',
        name: 'AnimationMap',
        component: () => import('@/views/visualization/animation-map/GMap.vue'),
        meta: { title: 'route.animation', icon: 'VideoCameraFilled', id: '2-1' }
      }
    ]
  },
  {
    path: '/error',
    name: 'Error',
    component: HLayout,
    redirect: 'noRedirect',
    meta: { title: 'route.error', icon: 'CircleCloseFilled', id: '4', hasOnlyChildren: true },
    children: [
      {
        path: '/errorPage',
        name: 'ErrorPage',
        component: () => import('@/views/error/ErrorPage.vue'),
        meta: { title: 'route.error', icon: 'CircleCloseFilled', id: '4-1' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 白名单
const whiteList = ["/login", "/auth-redirect"]; 
//   全局前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 我们想要在这里使用 store,确保 pinia 实例被激活
  const store = useLoginStore()
  // console.log("role---",store.role,router.getRoutes());
  if (store.token) { // 
    if (to.path === '/login') {
      // 如果已经登录，重定向到首页
      next('/')
    } else {
      // 用户权限
      if(store.role){
        next()
      }else{
        // 请求api获取权限身份，设置值
        // console.log('添加异步路由');
        store.setRole("admin")
        asyncRouter.map(item => {
          router.addRoute(item)
        })
        // 更新路由
        next({ path: to.path, replace: true });
      }
      
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
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
