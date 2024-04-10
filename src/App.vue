<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
import { useLayoutStore } from '@/store/index'
const store = useLayoutStore()
const bg = computed(() => store.themeColor)
const fontColor = computed(() => store.fontColor)
</script>

<template>
  <el-config-provider :locale="locale === 'en' ? en : zhCn">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss">
@include s(bg) {
  background-color: v-bind(bg);
}
@include s(fontColor) {
  color: v-bind(fontColor) !important;
}

</style>
