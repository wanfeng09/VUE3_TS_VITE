import { defineStore } from 'pinia'
import type { RouteRecordName } from 'vue-router'
import type { RouteInterface } from '@/types/layout/index'
import { useFullscreen } from '@vueuse/core'

export const useLayoutStore = defineStore(
  'layoutName',
  () => {
    // 是否刷新组件
    const isReload = ref(true)
    // 折叠
    const isCollapse = ref(false)
    // 全屏（不存在布局组件）
    const ifFull = ref(false)
    // 全屏(存在布局组件)
    const isFullscreen = ref(false)
    // 标签显示
    const ifTags = ref(true)
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
    // 标签数组
    const visitedViews = ref<RouteInterface[]>([])
    // 缓存标签名数组
    const cachedViews = ref<RouteRecordName[]>([])

    // 控制折叠
    const updateCollapse = (payload: boolean) => {
      isCollapse.value = payload
    }
    // 是否全屏(存在布局组件)
    const updateFullscreen = (payload: boolean) => {
      isFullscreen.value = payload
    }
    // 是否全屏（不存在布局组件）
    const updateFull = (payload: boolean) => {
      ifFull.value = payload
      // isFullscreen.value = payload
      // const { exit, toggle } = useFullscreen()
      // if (payload) {
      //   toggle()
      // } else {
      //   exit()
      // }
    }
    // 控制标签
    const updateTags = (payload: boolean) => {
      ifTags.value = payload
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

    // 添加标签
    const addTags = (payload: RouteInterface) => {
      // 判断是否重复
      if (visitedViews.value.some((v) => v.path === payload.path)) return
      visitedViews.value.push(payload)
    }

    // 添加缓存记录(根据路由名)
    const addCachedView = (payload: RouteRecordName) => {
      if (cachedViews.value.includes(payload)) return
      cachedViews.value.push(payload)
    }

    // 删除标签
    const delTags = (payload: RouteInterface) => {
      visitedViews.value = visitedViews.value.filter((item) => {
        return item.name !== payload.name
      })
    }

    // 删除缓存记录
    const delCachedView = (payload: RouteRecordName) => {
      const index = cachedViews.value.indexOf(payload)
      index > -1 && cachedViews.value.splice(index, 1)
    }

    // 删除其他标签
    const delOtherTags = (payload: RouteInterface) => {
      visitedViews.value = visitedViews.value.filter((item) => {
        return item.meta.affix || item.name === payload.name
      })
    }

    // 删除其他缓存记录
    const delOtherCachedView = (payload: RouteRecordName) => {
      const index = cachedViews.value.indexOf(payload)
      if (index > -1) {
        cachedViews.value = cachedViews.value.splice(index, 1)
      } else {
        cachedViews.value = []
      }
    }

    // 删除所有标签
    const delAllTags = () => {
      visitedViews.value = visitedViews.value.filter((item) => {
        return item.meta.affix
      })
    }
    // 删除所有缓存记录
    const delAllCachedView = () => {
      cachedViews.value = []
    }

    // 刷新组件
    const refreshComponents = () => {
      isReload.value = false
      setTimeout(() => {
        isReload.value = true
      }, 100)
    }

    // 重置仓库样式
    const resetStore = () => {
      localStorage.removeItem('layoutName')
      location.reload()
    }

    return {
      isReload,
      isCollapse,
      ifFull,
      isFullscreen,
      ifTags,
      visitedViews,
      cachedViews,
      themeColor,
      fontColor,
      sidebarBgColor,
      sidebarFontColor,
      sidebarActiveColor,
      updateCollapse,
      updateFull,
      updateFullscreen,
      addTags,
      addCachedView,
      delTags,
      delCachedView,
      delOtherTags,
      delOtherCachedView,
      delAllTags,
      delAllCachedView,
      updateTags,
      updateColors,
      resetStore,
      refreshComponents
    }
  },
  {
    persist: {
      paths: ['themeColor', 'fontColor', 'sidebarBgColor', 'sidebarFontColor', 'sidebarActiveColor']
    }
  }
)
