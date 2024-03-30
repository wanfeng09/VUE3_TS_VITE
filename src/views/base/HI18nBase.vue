<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <div class="h-contain">
    <p>{{ $t('home.hello', { msg: '你好' }) }}</p>
    <p>{{ $t('login.account') }}</p>
    <p>{{ t('home.car', 1) }}</p>
    <p>{{ t('home.car', 2) }}</p>
    <h2>Apple:</h2>
    <p>{{ t('home.apple', 0) }}</p>
    <p>{{ t('home.apple', 1) }}</p>
    <p>{{ t('home.apple', { count: 10 }, 10) }}</p>
    <p>{{ t('home.apple', 10) }}</p>
    <h2>Banana:</h2>
    <p>{{ t('home.banana', { n: 1 }, 1) }}</p>
    <p>{{ t('home.banana', 1) }}</p>
    <p>{{ t('home.banana', { n: 'too many' }, 100) }}</p>
    <el-button>我是 ElButton </el-button>
  </div>
</template>

<style scoped></style>
