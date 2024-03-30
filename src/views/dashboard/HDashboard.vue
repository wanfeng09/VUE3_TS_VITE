<script setup lang="ts">
import bg from '@/assets/img/bg.jpg'
import HEchart from '@/components/HEchart/HEchart.vue'
var points = [
  // 点坐标
  {
    value: [113.12244, 23.009505],
    itemStyle: { color: '#c1bb1f' },
    name: '11',
    total: 0,
    bj: 0,
    yj: 0,
    yx: 0,
    tj: 0,
    dw: 0
  },
  {
    value: [116.55, 40.01],
    itemStyle: { color: '#3eef1d' },
    name: '北京',
    total: 0,
    bj: 0,
    yj: 0,
    yx: 0,
    tj: 0,
    dw: 0
  },
  {
    value: [88.388277, 31.56375],
    itemStyle: { color: '#3eef1d' },
    name: '22',
    total: 5,
    bj: 0,
    yj: 0,
    yx: 5,
    tj: 0,
    dw: 0
  },
  {
    value: [108.479, 23.1152],
    itemStyle: { color: '#3eef1d' },
    name: '33',
    total: 10,
    bj: 0,
    yj: 0,
    yx: 10,
    tj: 0,
    dw: 0
  },
  {
    value: [127, 48],
    itemStyle: { color: '#3eef1d' },
    name: '44',
    total: 8,
    bj: 0,
    yj: 0,
    yx: 8,
    tj: 0,
    dw: 0
  },
  {
    value: [82.78, 43.27],
    itemStyle: { color: '#3eef1d' },
    name: '55',
    total: 18,
    bj: 0,
    yj: 0,
    yx: 18,
    tj: 0,
    dw: 0
  }
]
var lineToLf = [
  {
    name: '11',
    coords: [
      [113.12244, 23.009505],
      [116.55, 40.01]
    ],
    lineStyle: { color: '#c1bb1f' }
  },
  {
    name: '22',
    coords: [
      [88.388277, 31.56375],
      [116.55, 40.01]
    ],
    lineStyle: { color: '#3eef1d' }
  },
  {
    name: '33',
    coords: [
      [108.479, 23.1152],
      [116.55, 40.01]
    ],
    lineStyle: { color: '#3eef1d' }
  },
  {
    name: '44',
    coords: [
      [127, 48],
      [116.55, 40.01]
    ],
    lineStyle: { color: '#3eef1d' }
  },
  {
    name: '55',
    coords: [
      [82.78, 43.27],
      [116.55, 40.01]
    ],
    lineStyle: { color: '#3eef1d' }
  }
]
const option5 = {
  backgroundColor: 'transparent', // 设置背景色透明
  // 必须设置
  tooltip: {
    show: false
  },
  // 地图阴影配置
  geo: {
    map: 'china',
    // 这里必须定义，不然后面series里面不生效
    tooltip: {
      show: false
    },
    label: {
      show: false
    },
    zoom: 1.03,
    silent: true, // 不响应鼠标时间
    show: true,
    roam: false, // 地图缩放和平移
    // aspectScale: 0.75, // scale 地图的长宽比
    itemStyle: {
      borderColor: '#0FA3F0',
      borderWidth: 1,
      areaColor: '#00F1FF',
      shadowColor: 'rgba(1,34,73,0.48)',
      shadowBlur: 10,
      shadowOffsetX: -10, //
      shadowOffsetY: 10
    },
    select: {
      disabled: true
    },
    emphasis: {
      disabled: true,
      areaColor: '#00F1FF'
    },
    // 地图区域的多边形 图形样式 阴影效果
    // z值小的图形会被z值大的图形覆盖
    top: '30px',
    left: 'center',
    // 去除南海诸岛阴影 series map里面没有此属性
    regions: [
      {
        name: '南海诸岛',
        selected: false,
        emphasis: {
          disabled: true
        },
        itemStyle: {
          areaColor: '#00000000',
          borderColor: '#00000000'
        }
      }
    ],
    z: 1
  },
  series: [
    // 地图配置
    {
      type: 'map',
      map: 'china',
      zoom: 1,
      tooltip: {
        show: false
      },
      label: {
        show: true, // 显示省份名称
        color: '#04CFF5',
        align: 'center'
      },
      top: '30px',
      left: 'center',
      // aspectScale: 0.75,
      roam: false, // 地图缩放和平移
      itemStyle: {
        borderColor: '#0FA3F0', // 省分界线颜色  阴影效果的
        borderWidth: 1,
        areaColor: '#065CAE',
        opacity: 1
      },
      // 去除选中状态
      select: {
        disabled: true
      },
      emphasis: {
        // 聚焦后颜色
        disabled: false, // 开启高亮
        label: {
          align: 'center',
          color: '#04CFF5'
        },
        itemStyle: {
          color: '#ffffff',
          areaColor: '#0a8bd8' // 阴影效果 鼠标移动上去的颜色
        }
      },
      z: 2
    },
    // 点
    {
      name: 'companyPoint',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      showEffectOn: 'render',
      // zlevel: 2, // zlevel用于 Canvas 分层 相同的绘制在同一个canvas上
      rippleEffect: {
        number: 5, // 波纹数量
        period: 4, // 动画周期 数值越大，波动越慢
        scale: 3.5, // 动画中波纹的最大缩放比例
        brushType: 'stroke' // 波纹的绘制方式 stroke fill
      },
      label: {
        show: false,
        position: 'right',
        formatter: '{b}',
        color: '#97e9e1',
        fontSize: 14
      },
      symbol: 'circle',
      symbolSize: 16,
      data: points,
      tooltip: {
        show: true,
        backgroundColor: '#fff',
        padding: 0,
        borderWidth: 0,
        extraCssText: 'box-shadow: 0 0 0 rgba(0, 0, 0, 0);', // 去除box-shadow阴影
        formatter: (params: any) => {
          return `<div class="map-tip-box">
                      <div class="company-name">${params.name}</div>
                      <div class="monitor-total">监测总数：${params.data.total}台</div>
                      <div class="item-state-con">
                        <span class="dot bj"></span>
                        <span class="item-state-num">
                         <span class="num">${params.data.bj}台</span>
                         <span class="text">报警</span>
                        </span>
                      </div>
                       <div class="item-state-con">
                        <span class="dot yj"></span>
                        <span class="item-state-num">
                         <span class="num">${params.data.yj}台</span>
                         <span class="text">预警</span>
                        </span>
                      </div>
                       <div class="item-state-con">
                        <span class="dot yx"></span>
                        <span class="item-state-num">
                         <span class="num">${params.data.yx}台</span>
                         <span class="text">运行</span>
                        </span>
                      </div>
                       <div class="item-state-con">
                        <span class="dot tj"></span>
                        <span class="item-state-num">
                         <span class="num">${params.data.tj}台</span>
                         <span class="text">停机</span>
                        </span>
                      </div>
                       <div class="item-state-con">
                        <span class="dot dw"></span>
                        <span class="item-state-num">
                         <span class="num">${params.data.dw}台</span>
                         <span class="text">断网</span>
                        </span>
                      </div>
                     </div>`
        }
      },
      z: 4
    },
    // 地图线的动画效果
    {
      name: 'arrowline',
      type: 'lines',
      // zlevel: 1,
      effect: {
        show: true,
        period: 3, // 箭头指向速度，值越小速度越快
        trailLength: 0.1, // 特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: 'arrow', // 箭头图标
        symbolSize: 6 // 图标大小
      },
      lineStyle: {
        color: '#1DE9B6',
        width: 2, // 线条宽度
        opacity: 0.1, // 尾迹线条透明度
        curveness: 0.2 // 尾迹线条曲直度
      },
      data: lineToLf,
      z: 3
    }
  ]
}
</script>

<template>
  <div class="box" :style="{ background: `url(${bg})` }">
    <HEchart echartId="map" :option="option5" eWidth="100%" eHeight="100%" />
  </div>
</template>

<style lang="scss" scoped>
.box {
  @include bfc;
  background-size: 100% 100% !important;
  object-fit: contain;
  background-repeat: no-repeat !important;
}
</style>
