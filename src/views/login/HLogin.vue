<script setup lang="ts">
import login from './loginForm.vue'
import { useLayoutStore } from '@/store/index'
const store = useLayoutStore()
const bg = computed(() => store.themeColor)
const fontColor = computed(() => store.fontColor)
</script>
<template>
  <div class="container">
    <div class="box-left">
      <div class="box-left-center">
        后台管理系统
        <div>
          ......
        </div>
        <!-- <el-button type="primary">切换动画</el-button> -->
      </div>
    </div>
    <div class="box-right">
      <div class="box-right-center">
        <login></login>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;
  position: relative;
  display: flex;
}
.container::before {
  content: '';
  width: 2000px;
  height: 2000px;
  background-color: v-bind(bg);
  position: absolute;
  border-radius: 50%;
  transform: translateY(-50%);
  right: 48%;
  top: -10%;
  transition: 1.8s ease-in-out;
  z-index: 2;
}
.box {
  &-left {
    position: absolute;
    width: 50%;
    height: 100%;
    z-index: 3;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    &-center {
      margin: auto;
      font-size: 30px;
      color: v-bind(fontColor);
    }
  }

  &-right {
    position: absolute;
    width: 50%;
    height: 100%;
    z-index: 3;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    &-center {
      margin: auto;
    }
  }
}
</style>
