<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useTagsStore, useConfigStore } from '@/stores/index'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import type { RouteInterface } from '@/types/index'
import { computed, nextTick, ref, watch } from 'vue'

import { Close } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const tagsStore = useTagsStore()

const configStore = useConfigStore()
const bg = computed(() => configStore.themeColor)
const tagCircleBg = computed(() => configStore.fontColor)
const routes = computed(() => configStore.sidebarMenus)

let affixTags = ref()
// 是否激活
function isActive(val: string) {
  return route.path === val
}
watch(route, () => {
  // console.log('测试刷新当页缓存')
  addTags()
  moveToCurrentTag()
})
// 筛选路由 affix
// 注意：重定向为noRedirect的路由不会出现在tagsView中
function filterAffixTags(routes: RouteRecordRaw[]) {
  let tags: RouteInterface[] = []
  if (routes) {
    routes.forEach((route) => {
      if (route.redirect !== 'noRedirect' && route.meta && route.meta.affix) {
        tags.push({
          path: route.path,
          fullPath: route.path,
          name: route.name,
          meta: {
            title: route.meta.title as string,
            icon: route.meta.icon as string,
            affix: route.meta.affix ? true : false,
            hidden: route.meta.hidden ? true : false
          }
        })
      }
      if (route.children) {
        const tempTags = filterAffixTags(route.children)
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags]
        }
      }
    })
    return tags
  } else {
    return []
  }
}
function init() {
  affixTags.value = filterAffixTags(routes.value)
  for (const tag of affixTags.value) {
    if (tag.path) {
      tagsStore.addTags(tag)
    }
  }
}
// 初始化
init()
addTags()

// 注意query,params参数未填写，如需要自行解决
function addTags() {
  // const { name, query, params } = route
  const { name } = route
  if (name) {
    tagsStore.addCachedView(name)
    tagsStore.addTags({
      fullPath: route.fullPath,
      path: route.path,
      name: route.name ?? undefined,
      meta: {
        title: route.meta.title as string,
        icon: route.meta.icon as string,
        affix: route.meta.affix ? true : false,
        hidden: route.meta.hidden ? true : false
      }
    })
  }
}
const tagRef = ref()
const scrollContainer = ref()
// 滚动条位置
function moveToCurrentTag() {
  nextTick(() => {
    if (tagRef.value && tagRef.value.length > 1) {
      for (const tag of tagRef.value) {
        if (tag.to.path === route.path) {
          // 默认视图实际宽度
          const $containWidth = scrollContainer.value.$el.offsetWidth
          // 滚动条宽度
          const $scrollWidth = scrollContainer.value.wrapRef.scrollWidth
          const diff = $scrollWidth - $containWidth
          // console.log(diff, $containWidth, $scrollWidth)
          const currentIndex = tagRef.value.findIndex(
            (item: { to: { path: string } }) => item.to.path === route.path
          )
          if (currentIndex < 2) {
            scrollContainer.value.setScrollLeft(0)
          } else {
            const lastTag = tagRef.value[tagRef.value.length - 1]
            if (lastTag.to.path === route.path) {
              // console.log('last')
              scrollContainer.value.setScrollLeft(diff > 0 ? diff : 0)
            } else {
              // 中间值
              // console.log('center')
              const prevTag = tagRef.value[currentIndex - 1]
              const nextTag = tagRef.value[currentIndex + 1]
              const tagAndTagSpacing = 4
              const afterNextTagOffsetLeft =
                nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing
              const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing
              // console.log("afterNextTagOffsetLeft, beforePrevTagOffsetLeft",afterNextTagOffsetLeft, beforePrevTagOffsetLeft);
              // console.log("$scrollWidth , $containWidth",$scrollWidth , $containWidth);
              const scrollLeft = scrollContainer.value.wrapRef.scrollLeft
              // console.log("scrollLeft",scrollLeft);
              if (afterNextTagOffsetLeft > scrollLeft + $containWidth) {
                scrollContainer.value.setScrollLeft(afterNextTagOffsetLeft - $containWidth)
              } else if (beforePrevTagOffsetLeft < scrollLeft) {
                scrollContainer.value.setScrollLeft(beforePrevTagOffsetLeft)
              }
            }
          }
          break
        }
      }
    }
  })
}

// 关闭所选组件
function closeSelectedTag(val: RouteInterface) {
  if (!val.meta?.affix && val.name) {
    // console.log('closeSelectedTag', val)
    tagsStore.delTags(val)
    tagsStore.delCachedView(val.name)
    if (isActive(val.path)) {
      toLastView()
    }
  }
}
// 更新激活组件
function toLastView() {
  const visitedViews = tagsStore.visitedViews
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    router.push('/')
  }
}
const dropdownRef = ref()
function handleChange(evt: Event, val: RouteInterface) {
  if (!evt) return
  dropdownRef.value.forEach((item: { id: string; handleClose: () => void }) => {
    if (item.id === val.path) return
    item.handleClose()
  })
}
// 思路，跳转到其他页当做跳板，然后跳转到当前页
// 通过if控制组件刷新
function refreshSelectedTag(val: RouteInterface) {
  if (val.name) {
    tagsStore.delCachedView(val.name)
    tagsStore.addCachedView(val.name)
    tagsStore.refreshComponents()
  }
}
// 关闭其他标签
function closeOthersTags(val: RouteInterface) {
  if (val.name) {
    router.push({ path: val.fullPath })
    tagsStore.delOtherTags(val)
    tagsStore.delOtherCachedView(val.name)
    moveToCurrentTag()
  }
}
// 关闭所有标签
function closeAllTags() {
  router.push({ path: '/' })
  tagsStore.delAllTags()
  tagsStore.delAllCachedView()
  moveToCurrentTag()
}
</script>

<template>
  <el-scrollbar ref="scrollContainer" class="tags-box">
    <div class="flex">
      <router-link
        v-for="item in tagsStore.visitedViews"
        :key="item.path"
        :class="isActive(item.path) ? 'active' : ''"
        class="scrollbar-demo-item flex flex-row items-center justify-center flex-shrink-0"
        :to="{ path: item.path }"
        @click.middle="closeSelectedTag(item)"
        ref="tagRef"
      >
        <el-dropdown
          ref="dropdownRef"
          trigger="contextmenu"
          @visible-change="handleChange($event, item)"
          :id="item.path"
        >
          <span :class="['textColor', isActive(item.path) ? 'h-fontColor' : '']">
            {{ $t(item.meta?.title ?? 'langErr')
            }}<el-icon
              v-if="!item.meta?.affix"
              @click.prevent.stop="closeSelectedTag(item)"
              size="12"
              ><Close
            /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                :disabled="item.path !== route.path"
                @click="refreshSelectedTag(item)"
                >刷新当页</el-dropdown-item
              >
              <el-dropdown-item @click="closeSelectedTag(item)" :disabled="item.path == '/home'">{{
                $t('navbar.close')
              }}</el-dropdown-item>
              <el-dropdown-item
                :disabled="tagsStore.visitedViews.length === affixTags.length"
                @click="closeOthersTags(item)"
                >{{ $t('navbar.closeOther') }}</el-dropdown-item
              >
              <el-dropdown-item
                @click="closeAllTags"
                :disabled="tagsStore.visitedViews.length === affixTags.length"
              >
                {{ $t('navbar.closeAll') }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </router-link>
    </div>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.tags-box {
  height: 40px;
  line-height: 40px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
}

.scrollbar-demo-item {
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  margin: 6px 0 0 5px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  &:first-of-type {
    margin-left: 15px;
  }
  &:last-of-type {
    margin-right: 15px;
  }
  .textColor {
    cursor: pointer;
    color: #495060;
    display: flex;
    align-items: center;
  }
  &.active {
    background-color: v-bind(bg);
    color: #fff;
    border-color: v-bind(bg);
    &::before {
      content: '';
      background: v-bind(tagCircleBg);
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}

a,
a:focus,
a:hover {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}
</style>
