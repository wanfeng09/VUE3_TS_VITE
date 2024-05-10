import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { constantRoutes, asyncRoutes } from '@/router/index'
import { getInfo } from '@/api/login'
import { cloneDeep } from 'lodash'
import { filterAsyncRouter, filterHiddenRoutes } from '@/utils/permission'
export const useConfigStore = defineStore(
  'configStoreName',
  () => {
    const langOpen = ref(true)
    // 用户信息
    const userInfo = ref()
    // 用户名
    const userName = ref('')
    // 密码
    // const userPassword = ref('')
    // 头像
    const avatar = ref('')
    // token
    const token = ref('')
    // 角色
    const role = ref<string[]>([])
    // 按钮权限
    const btnPermissions = ref()
    // 路由
    const routes = ref()
    // 重写路由
    const rewriteRoutes = ref()
    // 侧边栏菜单
    const sidebarMenus = ref()

    // 添加路由
    const addRoutes = ref()
    // 缓存路由
    const cacheRoutes = ref()
    // 折叠
    const isCollapse = ref(false)
    // 全屏(存在布局组件)
    const isFullscreen = ref(false)
    // 主题颜色
    const themeColor = ref('#2f6feb')
    // 字体颜色
    const fontColor = ref('#fff')
    // 侧边栏背景色
    const sidebarBgColor = ref('#f5f5f5')
    // 侧边栏字体颜色
    const sidebarFontColor = ref('#303133')
    // 侧边栏激活颜色
    const sidebarActiveColor = ref('#2f6feb')
    // 获取用户信息
    const getUserInfo = () => {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res: any) => {
            userInfo.value = res.user
            if (res.roles && res.roles.length > 0) {
              setRole(res.roles)
              btnPermissions.value = res.permissions
            }
            userName.value = res.user.userName
            avatar.value = res.user.avatar
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
    // 设置用户登录信息
    const setLoginName = (val: string, params?: string) => {
      userName.value = val
      console.log('name', userName.value)

      token.value = params ?? ''
    }
    // 设置用户角色
    const setRole = (params: string[]) => {
      role.value = params
    }
    // 退出登录
    const logout = () => {
      return new Promise((resolve) => {
        token.value = ''
        userName.value = ''
        resolve('退出成功！')
      })
    }
    // 登录权限
    const hasPermission = (params: string[], obj: RouteRecordRaw) => {
      if (obj.meta && obj.meta.roles) {
        const arr = obj.meta.roles as string[]
        return params.some((params) => arr.includes(params))
      } else {
        // 没有做处理，无身份显示role直接通过
        return true
      }
    }
    // 筛选路由
    const filterAsyncRoutes = (arr: RouteRecordRaw[], params: string[]) => {
      const res: RouteRecordRaw[] = []
      arr.forEach((route) => {
        const tmp = { ...route }
        if (hasPermission(params, tmp)) {
          if (tmp.children) {
            tmp.children = filterAsyncRoutes(tmp.children, params)
          }
          res.push(tmp)
        }
      })
      return res
    }
    // 设置路由
    const setRouters = () => {
      let accessedRoutes: RouteRecordRaw[] = []
      if (role.value.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, role.value)
      }
      addRoutes.value = accessedRoutes
      routes.value = constantRoutes.concat(accessedRoutes)
      const rdata = cloneDeep(routes.value)
      // const sdata = cloneDeep(routes.value)
      // const sidebarRoutes = filterAsyncRouter(sdata)
      rewriteRoutes.value = filterAsyncRouter(rdata, true)
      sidebarMenus.value = filterHiddenRoutes(cloneDeep(rewriteRoutes.value))
    }

    // 控制折叠
    const updateCollapse = (payload: boolean) => {
      isCollapse.value = payload
    }
    // 是否全屏(存在布局组件)
    const updateFullscreen = (payload: boolean) => {
      isFullscreen.value = payload
    }

    // 改变主题颜色
    const updateColors = (payload: string, val: number) => {
      switch (val) {
        case 0:
          themeColor.value = payload
          break
        case 1:
          fontColor.value = payload
          break
        case 2:
          sidebarBgColor.value = payload
          break
        case 3:
          sidebarFontColor.value = payload
          break
        case 5:
          sidebarActiveColor.value = payload
          break
        default:
          break
      }
    }

    // 重置仓库样式
    const resetStore = () => {
      localStorage.removeItem('configStoreName')
      location.reload()
    }

    return {
      userName,
      langOpen,
      // userPassword,
      avatar,
      token,
      role,
      routes,
      rewriteRoutes,
      sidebarMenus,
      addRoutes,
      cacheRoutes,
      isCollapse,
      isFullscreen,
      themeColor,
      fontColor,
      sidebarBgColor,
      sidebarFontColor,
      sidebarActiveColor,
      updateColors,
      resetStore,
      logout,
      updateCollapse,
      updateFullscreen,
      setRouters,
      filterAsyncRoutes,
      hasPermission,
      setLoginName,
      setRole,
      getUserInfo
    }
  },
  {
    persist: {
      paths: [
        'langOpen',
        'userName',
        'token',
        'avatar',
        'themeColor',
        'fontColor',
        'sidebarBgColor',
        'sidebarFontColor',
        'sidebarActiveColor'
      ]
    }
  }
)
