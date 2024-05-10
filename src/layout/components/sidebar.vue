<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
import sidebarItem from './sidebarItem.vue'
import { useConfigStore } from '@/stores/index'
import { useRoute } from 'vue-router'
defineOptions({
  name: 'sidebar'
})
const activeMenu = ref('/home')
const route = useRoute()
// let menuList = ref<IMenuItem[]>([])
let routeList = ref()
const store = useConfigStore()
const sidebarBgColor = computed(() => store.sidebarBgColor)
const isCollapse = computed(() => store.isCollapse)
const getMenu = async () => {
  routeList.value = store.sidebarMenus
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
    // console.log('activeMenu', path)
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div class="h-conatiner">
    <div class="h-bg h-fontColor" style="height: 60px">Logo</div>
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
        <sidebarItem :menu-list="routeList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  border-right: none;
}
@include s(conatiner) {
  @include bfc;
  background-color: v-bind(sidebarBgColor);
}
</style>
