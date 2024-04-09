<script setup lang="ts">
import login from './loginForm.vue'
</script>
<template>
  <div class="container">
    <div class="box">
      <div class="box-position">
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
  background-color: #2f6feb;
  position: absolute;
  border-radius: 50%;
  transform: translateY(-50%);
  right: 48%;
  top: -10%;
  transition: 1.8s ease-in-out;
  z-index: 2;
}
.box {
  position: absolute;
  width: 50%;
  height: 100%;
  z-index: 3;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  &-position {
    margin: auto;
  }
}
</style>
