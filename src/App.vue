<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { locale,messages } = useI18n()
</script>

<template>
  <el-config-provider :locale="messages[locale]">
    <router-view />
  </el-config-provider>
</template>

<style scoped>
</style>
