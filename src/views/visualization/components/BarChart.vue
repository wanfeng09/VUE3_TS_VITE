<script setup lang="ts">
import * as echarts from 'echarts'
import type { IEchartsObj } from '@/types/echarts/index'
const props = defineProps({
  title: {
    type: String,
    default: '柱状图'
  },
  echartsId: {
    type: String,
    default: 'BarChart'
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

// 向父组件暴露方法
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
    value1: IEchartsObj[]
  }
) {
  let x: string[] = []
  let y: number[] = []
  data.value1.map((ele) => {
    x.push(ele.name)
    y.push(ele.value)
  })
  // 获取实例容器宽度
  let echartsWidth = mychart.getWidth()
  // 单个标签宽度
  let singleWidthLable = Math.floor(echartsWidth / 5) - 10
  // console.log(echartsWidth,singleWidthLable);

  const option = {
    // backgroundColor: '#00265f',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (params: {name: string, value: number}[]) {
        const item = params[0]
        return item.name + ' : ' + item.value
      }
    },
    grid: {
      left: '10',
      top: '30',
      right: '10',
      bottom: '10',
      containLabel: true
    },
    legend: {
      show: false
      // data: [ltitle],
      // top: '0',
      // left: '0',
      // itemWidth: 12,
      // itemHeight: 12,
      // itemGap: 25,
      // textStyle: {
      //   fontSize: 13,
      //   color: '#fff',
      //   fontFamily: 'Source Han Sans CN-Normal',
      //   padding: [0, 0, 0, 2],
      // },
      // selectedMode: false, // 取消点击事件
    },
    xAxis: [
      {
        type: 'category',
        data: x,
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
            width: 1,
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0, // 可以设置成 0 强制显示所有标签。
          // rotate:50,
          show: true,
          color: 'rgba(255,255,255,.8)',
          fontSize: 13,
          width: singleWidthLable,
          overflow: 'break'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          show: true,
          color: 'rgba(255,255,255,.8)',
          fontSize: 13
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,.1	)',
            width: 1,
            type: 'solid'
          }
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
        type: 'bar',
        data: y,
        name: props.title,
        barWidth: '35%', //柱子宽度
        // barGap: 1, //柱子之间间距
        itemStyle: {
          borderRadius: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#1456FE' }
          ])
        },
        emphasis: {
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#1456FE' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        }
      },
      {
        type: 'pictorialBar', // 象形柱图
        silent: true, // 禁止点击
        symbol: 'none', // 图形类型
        label: {
          show: true,
          position: 'top',
          formatter: '{c}',
          fontSize: 13,
          color: '#fff'
        },
        tooltip: {},
        data: y
      }
    ]
  }
  mychart.setOption(option)
  mychart.resize()
}
</script>
<template>
  <div :id="echartsId" :style="{ width: ewidth, height: eheight }"></div>
</template>
<style lang="scss" scoped></style>
