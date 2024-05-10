<script setup lang="ts">
import { computed, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useI18n } from 'vue-i18n'
import { useConfigStore } from '@/stores/index'

const { locale } = useI18n()
const size = ref('small')
const zIndex = ref(1000)
const store = useConfigStore()

const bg = computed(() => store.themeColor)
const fontColor = computed(() => store.fontColor)
</script>

<template>
  <el-config-provider :locale="locale === 'en' ? en : zhCn" :size="size" :z-index="zIndex">
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
