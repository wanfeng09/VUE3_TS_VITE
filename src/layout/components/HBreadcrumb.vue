<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
let levelList = ref<{ path: string; redirect: string; meta: { title: string } }[]>([])
watch(
  route,
  () => {
    levelList.value = []
    getBreadcrumb()
  },
  { immediate: true }
)
function getBreadcrumb() {
  levelList.value.push({
    path: '/',
    redirect: '/dashboard',
    meta: {
      title: 'route.home'
    }
  })
  if (route.name !== 'Dashboard') {
    route.matched.map((ele) => {
      let str = ele.redirect ?? 'noRedirect'
      if (!ele.meta.hasOnlyChildren) {
        levelList.value.push({
          path: ele.path,
          redirect: str as string,
          meta: {
            title: ele.meta.title as string
          }
        })
      }
    })
  }
}

function handleLink(item: { path: string; redirect: string; meta: { title: string } }) {
  if (item.redirect !== 'noRedirect') {
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
            v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
            style="color: #fff"
          >
            {{ $t(item.meta.title) }}
          </span>
          <a v-else style="color: #fff" @click="handleLink(item)">
            {{ $t(item.meta.title) }}
          </a>
        </el-breadcrumb-item>
      </TransitionGroup>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped></style>
