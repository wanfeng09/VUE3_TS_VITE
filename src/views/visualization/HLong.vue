<script setup lang="ts">
import LongView from './components/LongView.vue'
const contain = ref()
const longRef = ref()
onMounted(() => {
  longRef.value.init(contain.value.clientWidth, contain.value.clientHeight)
})

onBeforeUnmount(() => {
  longRef.value.clear()
})
</script>

<template>
  <div class="contain" ref="contain">
    <long-view ref="longRef" />
  </div>
</template>

<style lang="scss" scoped>
.contain {
  @include bfc();
}
</style>
