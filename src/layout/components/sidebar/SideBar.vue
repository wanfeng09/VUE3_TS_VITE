<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
import SubItem from './SubItem.vue'
import { useLayoutStore, useLoginStore } from '@/store'
import { useRoute } from 'vue-router'
// import RoutersApi from "@/mock/routes"
defineOptions({
  name: 'SideBar'
})
const activeMenu = ref('/dashboard')
const route = useRoute()
// let menuList = ref<IMenuItem[]>([])
let routeList = ref()
const store = useLayoutStore()
const sidebarBgColor = computed(() => store.sidebarBgColor)
const isCollapse = computed(() => store.isCollapse)
const getMenu = async () => {
  // console.log("所有路由",router.getRoutes());
  // router.getRoutes().map(ele => {
  //   if(ele.children.length > 0 && !ele.meta.hidden){
  //     routeList.value.push(ele)
  //   }
  // })
  useLoginStore().routers.map((ele) => {
    if (ele.children && ele.children.length > 0 && !ele.meta?.hidden) {
      routeList.value.push(ele)
    }
  })
}

onBeforeMount(() => {
  routeList.value = []
  getMenu()
})
watch(
  () => route,
  (val) => {
    const { path } = val
    activeMenu.value = path
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div class="h-conatiner">
    <div class="h-bg h-fontColor" style="height: 60px;">Logo</div>
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        :background-color="sidebarBgColor"
        :text-color="store.sidebarFontColor"
        :active-text-color="store.sidebarActiveColor"
        :collapse="isCollapse"
        unique-opened
      >
        <sub-item :menu-list="routeList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  border-right: none
}
@include s(conatiner) {
  @include bfc;
  background-color: v-bind(sidebarBgColor)
}
</style>
