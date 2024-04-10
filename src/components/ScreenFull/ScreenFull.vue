<template>
  <div @click="toggleFullscreen" style="padding: 0 10px;">
    <svg-icon :iconClass="isFullscreen ? 'narrow' : 'full'" :size="20"></svg-icon>
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
