<script setup lang="ts">
import HHeader from './HHeader.vue'
import HSidebar from './components/sidebar/HSidebar.vue'
import { useLayoutStore } from '@/store/index'
const store = useLayoutStore()
</script>

<template>
  <template v-if="!store.ifFull">
    <el-container>
      <el-aside><h-sidebar /></el-aside>
      <el-container>
        <el-header><h-header /></el-header>
        <el-main>
          <!-- 主体部分 -->
          <router-view />
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
