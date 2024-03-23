<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useI18n } from "vue-i18n";
const { locale } = useI18n()
</script>

<template>
  <el-config-provider :locale="locale === 'en' ? en : zhCn">
    <router-view />
  </el-config-provider>
</template>

<style scoped>
</style>
