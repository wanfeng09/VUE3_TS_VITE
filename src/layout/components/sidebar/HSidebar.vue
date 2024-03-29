<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
import HSubItem from './HSubItem.vue'
import { useRoute } from 'vue-router'
// import type { IMenuItem } from '@/types/layout/index'
import { useLayoutStore } from '@/store'
import { useRouter } from 'vue-router'
// import RoutersApi from "@/mock/routes"
defineOptions({
  name: 'HSidebar',
})
const activeMenu = ref('1')
const route = useRoute()
const router = useRouter()
// let menuList = ref<IMenuItem[]>([])
let routeList = ref()
const store = useLayoutStore()
const isCollapse = computed(() => store.isCollapse)
const getMenu = async () => {
  // const data = await getMenus()
  router.options.routes.map(ele => {
    if(!ele.meta?.hidden){
      routeList.value.push(ele)
    }
  })
  // menuList.value = RoutersApi || []
}

onBeforeMount(() => {
  routeList.value = []
  getMenu()
})
watch(
  () => route,
  val => {
    const { meta } = val
    activeMenu.value = meta.id as string
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div class="h-conatiner">
    <div style="height: 60px;background-color: #2f6feb;color: #fff;">Logo</div>
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="#f5f5f5"
        text-color="#000"
        :collapse="isCollapse"
        unique-opened
      >
        <h-sub-item :menu-list="routeList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
@include s(conatiner) {
  @include bfc;
  background-color: #f5f5f5;
}
</style>
