<script setup lang="ts">
const props = defineProps({
  iconClass: { type: String },
  className: { type: String },
  size: { type: Number, default: 26 }
})
const svgClass = computed(() => {
  return [props.iconClass, props.className].join(' ')
})
const iconName = computed(() => {
  return props.iconClass ? `#icon-${props.iconClass}` : '#icon'
})
</script>

<template>
  <svg :class="svgClass" aria-hidden="true" :style="{width: size + 'px',height: size + 'px'}">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<style lang="scss" scoped>
 
</style>
