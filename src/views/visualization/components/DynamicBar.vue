<script setup lang="ts">
import * as echarts from 'echarts'
const props = defineProps({
  echartsId: {
    type: String,
    default: 'DynamicBar'
  },
  ewidth: {
    type: String,
    default: '100%'
  },
  eheight: {
    type: String,
    default: '300px'
  }
})

// 相父组件暴露方法
defineExpose({
  epRef,
  fetchData
})

function epRef() {
  return echarts.init(document.getElementById(props.echartsId))
}
function fetchData(mychart: echarts.ECharts, data: number[]) {
  const option = {
    color: ['#1456FE', '#1493FE'],
    xAxis: {
      show: false
    },
    grid: {
      left: '10%',
      top: '0%',
      right: '10%',
      bottom: '0%',
      containLabel: true
    },
    yAxis: {
      type: 'category',
      data: ['测试1', '测试2'],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      axisLine: { show: false },
      axisLabel: {
        color: '#fff'
      },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    series: [
      {
        realtimeSort: true,
        name: 'A',
        type: 'bar',
        barCategoryGap: '20px',
        data: data,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true,
          color: '#fff'
        },
        itemStyle: {
          borderRadius: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#1456FE' }
          ])
        },
        emphasis: {
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#1456FE' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        }
      }
    ],
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: (k: number) => k,
    animationEasingUpdate: (k: number) => k
  }
  mychart.setOption(option)
}
</script>

<template>
  <div :id="echartsId" :style="{ width: ewidth, height: eheight }" />
</template>
