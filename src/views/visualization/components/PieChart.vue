<script setup lang="ts">
import * as echarts from 'echarts'
const props = defineProps({
  title: {
    type: String,
    default: '今日总数'
  },
  echartsId: {
    type: String,
    default: 'PieChart'
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

interface obj {
  name: string
  value: number
}
function epRef() {
  return echarts.init(document.getElementById(props.echartsId))
}

function fetchData(mychart: echarts.ECharts, data: obj[]) {
  let total = 0
  data.map((ele) => {
    total += ele.value
  })
  const option = {
    color: ['#1456FE', '#00CCFF', '#142AFE', '#1493FE', '#59c4e6'],
    percentPrecision: 2,
    tooltip: {
      show: true,
      trigger: 'item',
      // formatter: '{b} <br/>占比：{d}%', // 52 - 47
      formatter: (params: { value: number; name: string }) => {
        if (params.value === 0) {
          return `${params.name}<br />${props.title}:0`
        } else {
          let val = ((params.value / total) * 100).toFixed(0)
          return `${params.name}<br />${props.title}: ${val}%`
        }
      }
    },
    grid: {
      top: 'bottom',
      left: 10,
      bottom: 10
    },
    series: [
      {
        zlevel: 1,
        name: '区域',
        type: 'pie',
        selectedMode: 'single',
        radius: ['42%', '68%'], // 指定内，外半径
        startAngle: 60,
        itemStyle: {
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10,
          borderRadius: 2
        },
        data: data,
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#fff'
          }
        },
        label: {
          color: '#fff'
        }
      },
      {
        type: 'pie',
        selectedMode: 'single',
        radius: '36%', // 指定内，外半径
        center: ['50%', '50%'],
        startAngle: 90,
        itemStyle: {
          labelLine: {
            show: false
          },
          // borderWidth: 0.5,
          // shadowBlur: 10,
          // borderColor: '#4bf3f9',
          // shadowColor: '#9bfeff',
          // color: { // 圆环的颜色
          //   colorStops: [{
          //     offset: 0,
          //     color: '#4bf3f9', // 0% 处的颜色
          //   }, {
          //     offset: 1,
          //     color: '#4bf3f9', // 100% 处的颜色
          //   }]
          // },
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
            {
              offset: 1,
              color: 'rgba(50,171,241, 0)'
            },
            {
              offset: 0.5,
              color: 'rgba(50,171,241, .4)'
            },
            {
              offset: 0,
              color: 'rgba(55,70,130, 0)'
            }
          ]),
          shadowBlur: 60
        },
        data: [
          {
            value: total,
            name: '',
            label: {
              show: true,
              formatter: `{a|${props.title}}`,
              rich: {
                a: {
                  align: 'center',
                  color: '#4bf3f9',
                  fontSize: 14
                }
              },
              position: 'center'
            }
          }
        ]
      }
    ]
  }
  mychart.setOption(option)
}
</script>
<template>
  <div :id="echartsId" :style="{ width: ewidth, height: eheight }"></div>
</template>
