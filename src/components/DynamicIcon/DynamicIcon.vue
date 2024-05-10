<script setup lang="ts">
import { resolveIconComponent } from '@/utils/resolve'
import { shallowRef } from 'vue'
let inconName = shallowRef()
const props = defineProps({
  name: {
    type: String,
    default: 'Compass'
  }
})
resolveIconComponent(props.name).then((res) => {
  inconName.value = res
})
</script>

<template>
  <template v-if="inconName">
    <el-icon>
      <component :is="inconName" />
    </el-icon>
  </template>
</template>

<style scoped></style>
