<script setup lang="ts">
import * as echarts from "echarts";
import "echarts-liquidfill";
// npm install echarts-liquidfill --save 水晶球插件
const props = defineProps({
  echartsId: {
    type: String,
    default: "LiquidFill",
  },
  ewidth: {
    type: String,
    default: "100%",
  },
  eheight: {
    type: String,
    default: "300px",
  },
});
// 相父组件暴露方法
defineExpose({
  epRef,
  fetchData
 })

function epRef() {
  return echarts.init(document.getElementById(props.echartsId));
}
function fetchData(mychart: echarts.ECharts, params:number) {
  const percentage = Math.round(params * 100) + "%";
  const option = {
    series: [
      {
        type: "liquidFill",
        radius: "70%",
        z: 2,
        center: ["50%", "50%"],
        data: [0.8, 0.6, 0.4, 0.2], // data个数代表波浪数
        label: {
          show: true,
          fontSize: 20,
          formatter: function () {
            return percentage;
          },
          color: "#fff",
        },
      },
    ],
  };
  mychart.setOption(option);
}
</script>
<template>
  <div :id="echartsId" :style="{ width: ewidth, height: eheight }"></div>
</template>
