<script setup lang="ts">
import HHeader from './HHeader.vue';
import HSidebar from './components/sidebar/HSidebar.vue';
</script>

<template>
  <el-container>
      <el-aside ><h-sidebar /></el-aside>
      <el-container>
        <el-header><h-header /></el-header>
        <el-main>
           <!-- 主体部分 -->
           <router-view />
        </el-main>
      </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.el-container{
  width: 100%;
  @include bfc;
}
.el-aside{
  // max-width: 200px;
  @include bfc;
  width: fit-content;
}
.el-header{
    padding: 0;
    background-color: #2f6feb;
    color: #fff;
}
</style>
