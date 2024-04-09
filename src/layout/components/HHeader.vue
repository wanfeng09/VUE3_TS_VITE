<script setup lang="ts">
import { useLoginStore, useLayoutStore } from '@/store/index'
import { useRouter } from 'vue-router'
import ScreenFull from '@/components/ScreenFull/ScreenFull.vue'
import LangSelect from '@/components/LangSelect/LangSelect.vue'
import HBreadcrumb from './HBreadcrumb.vue'
const router = useRouter()
const store = useLoginStore()
const layoutStore = useLayoutStore()
const avatarUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

// 退出登录
function logout() {
  store.logout()
  router.push('/login')
}
</script>

<template>
  <div class="h-header h-header__flex h-header--between">
    <div class="h-header__left h-header__flex">
      <div style="padding: 0 10px 0 0; display: flex; align-items: center">
        <el-icon :size="22" v-if="layoutStore.isCollapse" @click="layoutStore.updateCollapse(false)"
          ><i-ep-Expand
        /></el-icon>
        <el-icon :size="22" v-else @click="layoutStore.updateCollapse(true)"><i-ep-Fold /></el-icon>
      </div>
      <h-breadcrumb />
    </div>

    <div class="h-header__right h-header__flex">
      <ScreenFull />
      <LangSelect />
      <el-dropdown ref="dropdownRef">
        <span class="el-dropdown-link">
          <div class="h-header__flex">
            <el-avatar :size="40" :src="avatarUrl" />
            <div style="padding: 0 10px">{{ store.username }}</div>
            <el-icon><i-ep-CaretBottom /></el-icon>
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
.el-dropdown {
  color: #fff;
}
.el-tooltip__trigger:focus-visible {
  outline: none;
}

@mixin flex {
  display: flex;
  align-items: center;
  flex-direction: row;
}

@include s(header) {
  height: 60px;
  padding: 0 20px;
  @include ds(flex) {
    @include flex;
  }
  @include ds(left) {
    flex: 1;
  }
  @include ds(right) {
    flex: 1;
    justify-content: end;
  }
  @include dd(between) {
    justify-content: space-between;
  }
}
</style>
