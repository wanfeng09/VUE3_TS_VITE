<script setup lang="ts">
import { useTime } from '@/utils/useTime'
import * as echarts from 'echarts'
import imgtop from '@/assets/img/head_bg.png'
let url = imgtop
let time = ref('')
let returnTime = ref(0)
onMounted(() => {
  fetchData()
})

returnTime.value = setInterval(() => {
  time.value = useTime().nowTime
}, 1000)

onUnmounted(() => {
  clearInterval(returnTime.value)
})

function fetchData() {
  const mychart = echarts.init(document.getElementById('echartsTitle'))
  const option = {
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: '可视化数据分析',
            fontSize: 30,
            // fontWeight: 'bold',
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: '#fff',
            lineWidth: 1
          },
          keyframeAnimation: {
            duration: 3000,
            loop: false,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: 'transparent',
                  lineDashOffset: 200,
                  lineDash: [200, 0]
                }
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: 'transparent'
                }
              },
              {
                percent: 1,
                style: {
                  fill: '#fff'
                }
              }
            ]
          }
        }
      ]
    }
  }
  mychart.setOption(option)
  window.addEventListener('resize', function () {
    mychart.resize()
  })
}
</script>

<template>
  <div class="header">
    <div class="header-top">
      <el-image class="imgs" :src="url" fit="fill" />
      <div class="flex">
        <div class="left">
          <slot />
        </div>
        <div id="echartsTitle" class="echartsTitle" />
        <div class="right">{{ time }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  &-top {
    position: relative;
    width: 100%;
    height: 80px;
    .imgs {
      width: 100%;
      height: 80px;
    }
    .flex {
      position: absolute;
      top: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 80px;
      padding: 0 20px;
      box-sizing: border-box;
      color: #fff;
    }
    .echartsTitle {
      flex: 2;
      height: 80px;
      // font-size: 30px;
      // letter-spacing: 10px;
    }
    .left {
      flex: 1;
      font-size: 14px;
    }
    .right {
      flex: 1;
      font-size: 14px;
      text-align: right;
    }
  }
}
</style>
