<script setup lang="ts">
import { useLayoutStore } from '@/store'
const store = useLayoutStore()
const props = defineProps({
  iconClass: { type: String },
  className: { type: String },
  size: { type: Number, default: 26 },
})
// 控制样式
const svgClass = computed(() => {
  return props.className ? `svg-icon ${props.className}` : 'svg-icon'
})

// svg文件名字
const iconName = computed(() => {
  return props.iconClass ? `#icon-${props.iconClass}` : '#icon'
})
</script>

<template>
  <svg :class="svgClass" aria-hidden="true" :font-size="size" :fill="store.fontColor">
    <use :href="iconName" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  display: block;
}
</style>
