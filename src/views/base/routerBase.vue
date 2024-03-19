<script setup lang="ts">
import { useRoute,useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
function goUrl() {
  router.push({
    name: 'Login',
    query: {
      name: 'zhangsan',
      age: 18
    }
  })
}
</script>

<template>
  <div >
    App
    <el-button @click="goUrl">路由跳转</el-button>
    <p>获取当前路由信息:{{ route.path + "---" + route.name }}</p>
  </div>
</template>

<style scoped>
</style>
