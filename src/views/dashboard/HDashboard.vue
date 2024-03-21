<script setup lang="ts">
import {resolveIconComponent} from "@/util/resolve"
let inconName = shallowRef()
resolveIconComponent('Compass').then(res => {
  inconName.value = res
})
</script>

<template>
  <div>
    <el-icon><i-ep-Compass /></el-icon>
    <div v-if="inconName">
      <el-icon>
        <component :is="inconName" />
      </el-icon>
    </div>
  </div>
</template>

<style scoped></style>
