import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteRecordName } from 'vue-router'
import type { RouteInterface } from '@/types/index'

export const useTagsStore = defineStore('TagsStoreName', () => {
  // 标签显示
  const ifTags = ref(true)
  // 标签数组
  const visitedViews = ref<RouteInterface[]>([])
  // 缓存标签名数组
  const cachedViews = ref<RouteRecordName[]>([])
  // 是否刷新组件
  const isReload = ref(true)
  // 控制标签
  const updateTags = (payload: boolean) => {
    ifTags.value = payload
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
      return item.meta?.affix || item.name === payload.name
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
      return item.meta?.affix
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

  return {
    ifTags,
    visitedViews,
    cachedViews,
    isReload,
    refreshComponents,
    addTags,
    addCachedView,
    delTags,
    delCachedView,
    delOtherTags,
    delOtherCachedView,
    delAllTags,
    delAllCachedView,
    updateTags
  }
})
