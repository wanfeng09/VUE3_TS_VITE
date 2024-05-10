<script setup lang="ts">
import { computed } from 'vue'
import { useTagsStore } from '@/stores/index'
import tags from './components/tags.vue'
import headerPage from './components/header.vue'
import sidebar from './components/sidebar.vue'
const store = useTagsStore()
const cachedViews = computed(() => store.cachedViews)
</script>
<template>
  <el-container>
    <el-aside><sidebar /></el-aside>
    <el-container>
      <el-header class="h-bg"><headerPage /></el-header>
      <el-main>
        <div v-if="store.ifTags" style="height: 40px; box-sizing: border-box">
          <tags />
        </div>
        <div
          v-if="store.isReload"
          :style="{ width: '100%', height: store.ifTags ? 'calc(100% - 40px)' : '100%' }"
        >
          <router-view v-slot="{ Component }">
            <transition mode="out-in">
              <keep-alive :include="cachedViews">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
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
}
.el-main {
  padding: 0;
}
</style>
