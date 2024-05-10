<script setup lang="ts"></script>
<template>
  <div class="flex justify-center items-center flex-col">
    <svg-icon icon-class="404" :size="500" />
    <router-link to="/">
      <el-button type="primary" size="large">{{ $t('goHome') }}</el-button>
    </router-link>
  </div>
</template>
<style scoped></style>
