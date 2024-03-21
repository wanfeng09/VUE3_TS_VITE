<script setup lang="ts">
import { resolveIconComponent } from '@/util/resolve'
let inconName = shallowRef()
const props = defineProps({
  name: {
    type: String,
    default: 'Compass',
  },
})
resolveIconComponent(props.name).then(res => {
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
