
<script setup lang="ts">
defineProps({
  lHeight: {
        type: String,
        default: '300px',
      },
})

</script>

<template>
  <div class="location" :style="{ height: lHeight }">
    <div class="map_bg" />
    <div class="circle_allow" />
    <div class="circle_bg" />
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  @keyframes rotate1 {
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @keyframes retate2 {
    100% {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }
  .location {
    position: relative;
    .map_bg {
      position: absolute;
      top: 54%;
      left: 50%;
      width: 200px;
      height: 200px;
      background: url(@/assets/img/map.png) center
        no-repeat;
      background-size: 100% 100%;
      opacity: 0.5;
      transform: translate(-50%, -50%);
    }
    .circle_allow {
      position: absolute;
      top: 54%;
      left: 50%;
      width: 250px;
      height: 250px;
      background: url(@/assets/img/jt.png) center no-repeat;
      background-size: 100% 100%;
      transform: translate(-50%, -50%);
      animation: retate2 10s linear infinite;
    }

    .circle_bg {
      position: absolute;
      top: 54%;
      left: 50%;
      width: 300px;
      height: 300px;
      background: url(@/assets/img/lbx.png) center
        no-repeat;
      background-size: 100% 100%;
      opacity: 0.4;
      transform: translate(-50%, -50%);
      animation: rotate1 10s linear infinite;
    }
  }
</style>
