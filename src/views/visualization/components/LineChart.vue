<script setup lang="ts">
import * as echarts from 'echarts'
const props = defineProps({
  echartsId: {
    type: String,
    default: 'LineChart'
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
function fetchData(
  mychart: echarts.ECharts,
  data: {
    value1: {
      name: string
      value: number
      value2: number
    }[]
  }
) {
  let x: string[] = []
  let y: number[] = []
  let y1: number[] = []
  data.value1.map((ele) => {
    x.push(ele.name)
    y.push(ele.value)
    y1.push(ele.value2)
  })
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#dddc6b'
        }
      }
    },
    legend: {
      top: '0%',
      data: ['测试1', '测试2'],
      textStyle: {
        color: '#fff',
        fontSize: '12'
      }
    },
    grid: {
      left: '10',
      top: '30',
      right: '10',
      bottom: '10',
      containLabel: true
    },

    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          color: 'rgba(255,255,255,.6)',
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.2)'
          }
        },

        data: x
      }
    ],

    yAxis: [
      {
        type: 'value',
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        },
        axisLabel: {
          color: 'rgba(255,255,255,.6)',
          fontSize: 12
        },

        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        }
      }
    ],
    series: [
      {
        name: '测试1',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          color: '#1456FE',
          width: 1
        },
        areaStyle: {
          type: 'linear',
          x: 0, // x:  从左向右 1 ——> 0
          y: 0, // y:  从上向下 1 ——> 0
          x2: 0, // x2: 从右向左 1 ——> 0
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(1, 132, 213, 0.4)'
            },
            {
              offset: 0.8,
              color: 'rgba(1, 132, 213, 0.1)'
            }
          ],
          shadowColor: 'rgba(0, 0, 0, 0.1)'
        },
        itemStyle: {
          color: '#1456FE',
          borderColor: 'rgba(221, 220, 107, .1)',
          borderWidth: 12
        },
        data: y
      },
      {
        name: '测试2',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          color: '#00CCFF',
          width: 1
        },
        areaStyle: {
          type: 'linear',
          x: 0, // x:  从左向右 1 ——> 0
          y: 0, // y:  从上向下 1 ——> 0
          x2: 0, // x2: 从右向左 1 ——> 0
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(1, 132, 213, 0.4)'
            },
            {
              offset: 0.8,
              color: 'rgba(1, 132, 213, 0.1)'
            }
          ],
          shadowColor: 'rgba(0, 0, 0, 0.1)'
        },
        itemStyle: {
          color: '#00CCFF',
          borderColor: 'rgba(221, 220, 107, .1)',
          borderWidth: 12
        },
        data: y1
      }
    ]
  }
  mychart.setOption(option)
}
</script>

<template>
  <div :id="echartsId" :style="{ width: ewidth, height: eheight }"></div>
</template>
