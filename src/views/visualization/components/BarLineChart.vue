<script setup lang="ts">
import * as echarts from "echarts";
import type { IEchartsObj } from '@/types/echarts/index'
const props = defineProps({
  echartsId: {
    type: String,
    default: "BarLineChart",
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
  fetchData,
});

function epRef() {
  return echarts.init(document.getElementById(props.echartsId));
}

function fetchData(
  mychart: echarts.ECharts,
  data: {
    value1: IEchartsObj[];
    value2: IEchartsObj[];
  },
  pernum = 5
) {
  /* 数据 */
  let dataZoomEnd = (pernum / data.value1.length) * 100;
  let dataZoomStart = 0;
  let xData: string[] = [];
  let values1: number[] = []; // 柱状
  let values2: number[] = []; // 折线
  const legendData = ["数据1", "数据2"];
  data.value1.map((ele) => {
    xData.push(ele.name);
    values1.push(ele.value);
  });

  data.value2.map((ele) => {
    values2.push(ele.value);
  });

  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
      position: function (
        point: Array<number>,
        params: Object | Array<{}>,
        dom: HTMLDivElement,
        rect: Object,
        size: {
          contentSize: Array<number>;
          viewSize: number[];
        }
      ) {
        // 提示框位置
        let x: number | string = 0;
        let y: number | string = 0;
        //提示框定位
        if (point[0] + size.contentSize[0] < size.viewSize[0]) {
          x = point[0];
        } else if (point[0] > size.contentSize[0]) {
          x = point[0] - size.contentSize[0];
        } else {
          x = "30%";
        }
        if (point[1] > size.contentSize[1]) {
          y = point[1] - size.contentSize[1];
        } else if (point[1] + size.contentSize[1] < size.viewSize[1]) {
          y = point[1];
        } else {
          y = "30%";
        }
        return [x, y];
      },
      formatter: (params: { value: number; name: string }[]) => {
        return `
            <div style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:12px;">${params[0].name}</div>
            <div style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:4px;">${legendData[0]}：${params[0].value}</div>
            <div style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:4px;">${legendData[1]}：${params[1].value}</div>`;
      },
      extraCssText:
        "opacity: 0.8;background-color:#050F1B;padding:16px;box-shadow: 1px 6px 15px 1px rgba(0,0,0,0.13);border-radius: 4px;filter: blur(undefinedpx);border:none;",
    },
    legend: {
      data: legendData,
      top: "0",
      left: "0",
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 25,
      textStyle: {
        fontSize: 13,
        color: "#fff",
        fontFamily: "Source Han Sans CN-Normal",
        padding: [0, 0, 0, 2],
      },
      selectedMode: false, // 取消点击事件
    },
    grid: {
      left: "0%",
      top: "16%",
      right: "0%",
      bottom: "16%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: xData,
      axisTick: {
        show: false, //隐藏X轴刻度
      },
      axisLine: {
        lineStyle: {
          color: "#1a6d84",
        },
      },
      axisLabel: {
        show: true,
        color: "#82AFC6",
        fontSize: 13,
        fontFamily: "Source Han Sans CN-Normal",
      },
    },
    yAxis: [
      {
        type: "value",
        // name: legendData[0],
        boundaryGap: ["0%", "20%"],
        alignTicks: true,
        splitNumber: 5,
        // nameTextStyle: {
        //   color: '#82AFC6',
        //   fontSize: 13,
        //   fontFamily: 'Source Han Sans CN-Normal',
        //   align: 'left',
        //   verticalAlign: 'center',
        // },
        axisLabel: {
          color: "#82AFC6",
          fontSize: 13,
          fontFamily: "Source Han Sans CN-Normal",
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: "rgba(49, 218, 255, 0.5)",
            type: "dashed",
          },
        },
      },
      {
        type: "value",
        // name: legendData[1],
        position: "right",
        boundaryGap: ["0%", "20%"],
        alignTicks: true,
        splitNumber: 5,
        // nameTextStyle: {
        //   color: '#82AFC6',
        //   fontSize: 13,
        //   fontFamily: 'Source Han Sans CN-Normal',
        //   align: 'right',
        //   verticalAlign: 'center',
        // },
        axisLabel: {
          color: "#82AFC6",
          fontSize: 13,
          fontFamily: "Source Han Sans CN-Normal",
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: "rgba(49, 218, 255, 0.5)",
            type: "dashed",
          },
        },
      },
    ],
    series: [
      {
        type: "bar",
        name: legendData[0],
        data: values1,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#83bff6", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#1456FE", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#1456FE", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#83bff6", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            borderRadius: [4, 4, 0, 0],
          },
        },
        barWidth: 26,
      },
      {
        name: legendData[1],
        type: "line",
        data: values2,
        yAxisIndex: 1,
        symbolSize: 8, //标记的大小
        emphasis: {
          scale: 1.5,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(6, 201, 112, 0.3)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(47,145,255,0)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        lineStyle: {
          color: "rgba(6, 201, 112, 1)",
          width: 2,
        },
        itemStyle: {
          //折线拐点标志的样式
          color: "rgba(6, 201, 112, 1)",
          borderColor: "rgba(6, 201, 112, 1)",
          borderWidth: 2,
        },
        // smooth: true
      },
      {
        // 滚动点
        type: "lines",
        zIndex: 999,
        z: 999,
        yAxisIndex: 1,
        coordinateSystem: "cartesian2d",
        polyline: true,
        smooth: true,
        effect: {
          show: true,
          trailLength: 0,
          period: 10, //光点滑动速度
          delay: 2000,
          symbol: "circle",
          color: "#9eefce",
          symbolSize: 8,
          shadowBlur: 10,
          shadowColor: "#9eefce",
        },
        lineStyle: {
          show: false,
          opacity: 0,
        },
        data: [
          {
            coords: xData.map((item, index) => {
              return ["" + xData[index], "" + values2[index]];
            }),
          },
        ],
      },
    ],
    // 数据区域缩放组件配置
    dataZoom: [
      {
        type: "inside",
        // 数据窗口范围的起始百分比
        start: dataZoomStart,
        // 数据窗口范围的结束百分比
        end: dataZoomEnd,
        // 是否锁定选择区域（或叫做数据窗口）的大小，如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放
        zoomLock: true,
      },
      // 手柄的icon相关配置
      {
        handleIcon:
          "path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
        handleSize: "100%",
        height: 18,
        bottom: 16,
        handleStyle: {
          color: "#fff",
          shadowBlur: 3,
          shadowColor: "rgba(0, 0, 0, 0.6)",
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
      },
    ],
  };
  option && mychart.setOption(option);

  var count = 0;
  var timer = null;

  var dataLength = option.series[1].data.length;
  timer && clearInterval(timer);
  timer = setInterval(() => {
    mychart.dispatchAction({
      type: "downplay",
      seriesIndex: 1,
    });
    mychart.dispatchAction({
      type: "highlight",
      seriesIndex: 1,
      dataIndex: count % dataLength,
    });
    mychart.dispatchAction({
      type: "showTip",
      seriesIndex: 1,
      dataIndex: count % dataLength,
    });
    count++;
  }, 2000);
}
</script>

<template>
  <div :id="echartsId" :style="{ width: ewidth, height: eheight }"></div>
</template>
