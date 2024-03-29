<script setup lang="ts">
import {resolveIconComponent} from "@/utils/resolve"
let inconName = shallowRef()
resolveIconComponent('Compass').then(res => {
  inconName.value = res
})
</script>

<template>
  <div class="h-contain">
    <div>图标使用（动态+按需）</div>
    <el-icon><i-ep-Compass /></el-icon>
    <div v-if="inconName">
      <el-icon>
        <component :is="inconName" />
      </el-icon>
    </div>
  </div>
</template>

<style scoped></style>
