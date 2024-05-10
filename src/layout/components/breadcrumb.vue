<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useConfigStore } from '@/stores/index'
import { computed, ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const separatorbg = computed(() => configStore.fontColor)

let levelList = ref<{ path: string; redirect: string; meta: { title: string } }[]>([])
watch(
  route,
  () => {
    levelList.value = []
    getBreadcrumb()
  },
  { immediate: true }
)

// 未处理子级多条，隐藏只显示一个子级
function getBreadcrumb() {
  levelList.value.push({
    path: '/',
    redirect: '/home',
    meta: {
      title: 'route.home'
    }
  })
  if (route.path !== '/home') {
    route.matched.map((item) => {
      if (route.matched && route.matched.length > 0) {
        let str = item.redirect ? item.redirect.toString() : ''
        levelList.value.push({
          path: item.path,
          redirect: str,
          meta: {
            title: item.meta && item.meta.title ? item.meta.title.toString() : 'langErr'
          }
        })
      }
    })
  }
}

function handleLink(item: { path: string; redirect: string; meta: { title: string } }) {
  if (item.redirect) {
    router.push(item.path)
  }
}
</script>

<template>
  <div>
    <el-breadcrumb>
      <TransitionGroup name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path"
          ><span
            class="h-fontColor"
            v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          >
            {{ $t(item.meta.title) }}
          </span>
          <a class="h-fontColor" v-else @click="handleLink(item)">
            {{ $t(item.meta.title) }}
          </a>
        </el-breadcrumb-item>
      </TransitionGroup>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-breadcrumb__separator) {
  color: v-bind(separatorbg);
}
</style>
