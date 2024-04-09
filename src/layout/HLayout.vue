<script setup lang="ts">
import HHeader from './components/HHeader.vue'
import SideBar from './components/sidebar/SideBar.vue'
import HTags from './components/HTags.vue'
import { useLayoutStore } from '@/store/index'
const store = useLayoutStore()
</script>

<template>
  <template v-if="!store.ifFull">
    <el-container>
      <el-aside><side-bar /></el-aside>
      <el-container>
        <el-header><h-header /></el-header>
        <el-main>
          <div v-if="store.ifTags" style="height: 40px; box-sizing: border-box">
            <h-tags />
          </div>
          <div :style="{ width: '100%', height: store.ifTags ? 'calc(100% - 40px)' : '100%' }">
            <router-view v-slot="{ Component }">
              <transition mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </template>
  <template v-else>
    <!-- 主体部分 -->
    <router-view />
  </template>
</template>

<style lang="scss" scoped>
// 过度效果
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.el-container {
  width: 100%;
  @include bfc;
}
.el-aside {
  // max-width: 200px;
  @include bfc;
  width: fit-content;
}
.el-header {
  padding: 0;
  background-color: #2f6feb;
  color: #fff;
}
.el-main {
  padding: 0;
}
</style>
