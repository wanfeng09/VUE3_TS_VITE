<script setup lang="ts">
import HHeader from './HHeader.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header><h-header /></el-header>
        <el-main>
           <!-- 主体部分 -->
           <router-view />
        </el-main>
      </el-container>
    </el-container>
   
  </div>
</template>

<style lang="scss" scoped>
.el-header{
    padding: 0;
    background-color: #2f6feb;
    color: #fff;
}
</style>
