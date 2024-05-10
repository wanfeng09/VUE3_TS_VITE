import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useConfigStore } from '@/stores/index'

import Layout from '@/layout/index.vue'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: 'route.home', icon: 'HomeFilled', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'User',
    meta: { title: 'route.user', icon: 'UserFilled' },
    children: [
      {
        path: 'roles',
        component: () => import('@/views/user/roles.vue'),
        name: 'Roles',
        meta: { title: 'route.roles', icon: 'QuestionFilled' }
      },
      {
        path: 'menus',
        component: () => import('@/views/user/menus.vue'),
        name: 'Menus',
        meta: { title: 'route.menus', icon: 'Grid', hidden: true } //页面需要的权限
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error-page/401.vue'),
    meta: { hidden: true }
  }
]
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: { title: 'route.system', icon: 'Tools' }, //页面需要的权限
    children: [
      {
        path: 'setting',
        component: () => import('@/views/setting/index.vue'),
        name: 'Setting',
        meta: { title: 'route.setting', icon: 'HelpFilled', role: ['admin', 'edit'] } //页面需要的权限
      },
      {
        path: 'permission',
        component: () => import('@/views/setting/permission.vue'),
        name: 'Permission',
        meta: { title: 'route.permission', icon: 'Comment', role: ['edit'] } //页面需要的权限
      }
    ]
  },
  // 必须在后添加
  { path: '/:path(.*)*', redirect: '/404', meta: { hidden: true } }
]
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

// 白名单
const whiteList = ['/login', '/404', '/401']
//   全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 我们想要在这里使用 store,确保 pinia 实例被激活
  const store = useConfigStore()
  if (store.token) {
    // to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
    if (to.path === '/login') {
      // 如果已经登录，重定向到首页
      next('/')
    } else {
      // 设置用户权限
      console.log('用户角色---------', store.role)
      if (store.role.length > 0) {
        next()
      } else {
        console.log('获取身份验证')
        try {
          const res: any = await store.getUserInfo()
          store.setRole(res.roles)
          store.setRouters()
          asyncRoutes.map((item) => {
            router.addRoute(item)
          })
          next({ path: to.path, replace: true })
        } catch (error) {
          await store.logout()
          next('/login')
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
//   全局后置钩子
router.afterEach(() => {})
export default router
