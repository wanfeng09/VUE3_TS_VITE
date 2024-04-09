import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes } from '@/router/index'
import type { RouteRecordRaw } from 'vue-router'

export const useLoginStore = defineStore('loginName', {
  state: () => ({
    username: '',
    password: '',
    roles: [] as string[],
    token: '',
    routers: [] as RouteRecordRaw[],
    addRouters: [] as RouteRecordRaw[],
    cacheRoutes: [] as RouteRecordRaw[]
  }),
  getters: {},
  actions: {
    setLoginName(val: string, token?: string) {
      this.username = val
      this.token = token ?? ''
    },
    setRole(role: string[]) {
      this.roles = role
    },
    logout() {
      this.username = ''
      this.roles = []
      this.token = ''
    },
    hasPermission(roles: string[], route: RouteRecordRaw) {
      if (route.meta && route.meta.roles) {
        const arr = route.meta.roles as string[]
        return roles.some((role) => arr.includes(role))
      } else {
        // 没有做处理，无身份显示roles直接通过
        return true
      }
    },
    filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
      const res: RouteRecordRaw[] = []
      routes.forEach((route) => {
        const tmp = { ...route }
        if (this.hasPermission(roles, tmp)) {
          if (tmp.children) {
            tmp.children = this.filterAsyncRoutes(tmp.children, roles)
          }
          res.push(tmp)
        }
      })

      return res
    },
    setRouters() {
      let accessedRoutes: RouteRecordRaw[] = []
      if (this.roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = this.filterAsyncRoutes(asyncRoutes, this.roles)
      }
      this.addRouters = accessedRoutes
      this.routers = constantRoutes.concat(accessedRoutes)
    }
  },
  /**
   * pinia-plugin-persist插件用法
   * 开启数据缓存，默认缓存所有state，通过指定paths指定要长久化的字段，默认存储sessionStorage
   * persist: {
    enabled: true,
    strategies: [
      //   {
      //       key: 'username', // 设置存储的key
      //       storage: localStorage // 修改存储位置
      //   }
      {
        paths: ['username'], // 指定要长久化的字段
        storage: localStorage
      }
    ]
  }
   */
  //
  persist: {
    paths: ['username', 'token']
  }
})
