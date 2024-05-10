<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useConfigStore } from '@/stores/index'
import { CaretBottom } from '@element-plus/icons-vue'
import ScreenFull from '@/components/ScreenFull/ScreenFull.vue'
import LangSelect from '@/components/LangSelect/LangSelect.vue'
import breadcrumb from './breadcrumb.vue'
const router = useRouter()
const store = useConfigStore()

const avatarUrl = store.avatar
  ? store.avatar
  : 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
function isCollapseChange() {
  store.updateCollapse(!store.isCollapse)
}
// 退出登录
function logout() {
  store.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex flex-row items-center justify-between h-14 pl-5 pr-5">
    <div class="flex flex-row items-center">
      <div
        style="padding: 0 10px 0 0; display: flex; align-items: center"
        @click="isCollapseChange"
      >
        <template v-if="store.isCollapse">
          <svg-icon iconClass="expand" :size="20"></svg-icon>
        </template>
        <template v-else>
          <svg-icon iconClass="shrink" :size="20"></svg-icon>
        </template>
      </div>
      <breadcrumb />
    </div>

    <div class="flex flex-row items-center">
      <ScreenFull />
      <LangSelect />
      <el-dropdown ref="dropdownRef">
        <span class="el-dropdown-link">
          <div class="flex items-center h-fontColor" style="padding-left: 10px">
            <el-avatar :size="40" :src="avatarUrl" />
            <div style="padding: 0 10px">{{ store.userName }}</div>
            <el-icon><CaretBottom /></el-icon>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s ease;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.el-tooltip__trigger:focus-visible {
  outline: none;
}
</style>
