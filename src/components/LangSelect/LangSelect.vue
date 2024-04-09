<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
// 语言切换
function languageChange() {
  if (locale.value === 'zh') {
    locale.value = 'en'
  } else {
    locale.value = 'zh'
  }
}
</script>

<template>
  <div @click="languageChange" style="padding-right: 20px">
    <svg-icon :icon-class="locale === 'en' ? 'en' : 'zh'" />
  </div>
</template>

<style scoped></style>
