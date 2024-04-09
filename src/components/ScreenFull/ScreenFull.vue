<template>
  <div @click="toggleFullscreen" style="padding-right: 20px">
    <svg-icon :iconClass="isFullscreen ? 'narrow' : 'full'"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { toggle, isFullscreen } = useFullscreen()

const toggleFullscreen = () => {
  toggle()
}
</script>

<style scoped lang="scss"></style>
