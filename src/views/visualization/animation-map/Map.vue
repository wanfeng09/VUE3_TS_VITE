<template>
  <div class="box" :class="{ full: fullVal }">
    <!-- <el-button type="primary" @click="fullVal = !fullVal">切换大屏</el-button> -->
    <div id="GaodeMap" ref="GaodeMap" />
  </div>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import {
  ref,
  onBeforeUnmount,
  onMounted,
  render,
  h,
  defineAsyncComponent,
  createApp,
} from "vue";
import { getGeocode } from "@/api/map";
import { lineArr } from "./line";
import { PlayStatus } from "./enum";
// 信息窗体
import CustomInfoWindow from "./CustomInfoWindow.vue";
const GaodeMap = ref();
let fullVal = ref<Boolean>(false);
// 地图初始化
let a_map: AMap | undefined = undefined;
let loca: Loca | undefined = undefined;
// 创建实例
let g_map: AMap.Map | undefined = undefined;
let lacaMap: Loca.Container | undefined = undefined;

let polyline = ref(); // 轨迹路线
let marker = ref(); // 标记点
let isPlaying = PlayStatus.STOP; // 是否正在播放轨迹

let markerList = ref([]); // 标记点数组
let currentIndex = ref(0); // 当前播放到的轨迹点索引
const zoomLevel = 17;
onMounted(() => {
  init();
});

function init() {
  AMapLoader.load({
    key: import.meta.env.VITE_MAP_KEY,
    version: "2.0",
    plugins: [
      "AMap.ToolBar",
      "AMap.ControlBar",
      "AMap.Geocoder",
      "AMap.MarkerCluster",
      "AMap.Weather",
      "AMap.Polyline",
    ],
    Loca: {
      version: "2.0",
    },
  })
    .then(() => {
      // console.log(window);
      a_map = window.AMap;
      loca = window.Loca;
      if (a_map) {
        g_map = new a_map.Map("GaodeMap", {
          pitch: 50, //地图俯仰角度，有效范围 0 度- 83 度
          viewMode: "3D", //地图模式
          rotateEnable: true, //是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
          pitchEnable: true, //是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
          zoom: zoomLevel, //初始化地图层级
          rotation: -15, //初始地图顺时针旋转的角度
          zooms: [2, 20], //地图显示的缩放级别范围
          center: [113.185152, 23.393286], //初始地图中心经纬度
        });
        if (loca) {
          lacaMap = new loca.Container({
            map: g_map,
          });
        }
        // 控制地图旋转插件
        g_map.addControl(
          new a_map.ControlBar({
            position: {
              right: "10px",
              top: "10px",
            },
          })
        );
        // 地图缩放插件
        g_map.addControl(
          new a_map.ToolBar({
            position: {
              right: "40px",
              top: "110px",
            },
          })
        );
        // 添加标记点
        const position = new a_map.LngLat(113.185152, 23.393286); //Marker 经纬度
        addMarker(position);

        // 轨迹线
        getLine();
        // getWeather();
        // g_map.on("click", (e) => {
        //   console.log(e.lnglat.lat, e.lnglat.lng, e.pos);
        //   geocode(e.lnglat.lng, e.lnglat.lat);
        // });
      }
    })
    .catch((e) => {
      console.log("error-->", e);
    });
}
// 轨迹播放
function getAnimateLine() {
  g_map?.setStatus({
    zoomEnable: false,
  });
  polyline.value.setPath([
    [113.185152, 23.393286],
    [113.185152, 23.393286],
  ]);
  lacaMap?.viewControl.addTrackAnimate(
    {
      path: lineArr, // 镜头轨迹，二维数组，支持海拔
      duration: 12000, // 时长
      timing: [
        [0, 0.3],
        [1, 0.7],
      ], // 速率控制器
      rotationSpeed: 10, // 每秒旋转多少度
    },
    function () {
      isPlaying = PlayStatus.CLEAR; // 完成（清空）
      clearMarker();
      addMarker(marker.value.getPosition());
      console.log("getAnimateLine", marker.value.getPosition());
      console.log("完成");
      g_map?.setStatus({
        zoomEnable: true,
      });
    }
  );
}
// 开始播放、暂停播放
async function playLine() {
  if (a_map && lacaMap) {
    /**
     * 未开始4 、已完成3 -重新开始0
     * 运行中0、恢复2 - 暂停 1
     * 暂停 1 - 恢复2
     */
    isPlaying =
      isPlaying === 4 || isPlaying === 3
        ? PlayStatus.START
        : isPlaying === 0 || isPlaying === 2
        ? PlayStatus.PAUSE
        : PlayStatus.RESUME;
    console.log("路线播放", isPlaying);
    clearMarker();
    addMarker(marker.value.getPosition());
    isRuning();
  }
}

function isRuning() {
  run();
  // 开始播放
  if (isPlaying === 0) {
    lacaMap?.animate.start();
    getAnimateLine();
  } else if (isPlaying === 2) {
    // 恢复暂停的动画，当调用过 pauseAnimate() 方法暂停动画播放之后，用此方法来恢复动画的继续播放。
    lacaMap?.viewControl.resumeAnimate();
  } else if (isPlaying === 1) {
    // 暂停所有动画
    lacaMap?.viewControl.pauseAnimate();
  } else if (isPlaying === 3 || isPlaying === 4) {
    // lacaMap?.animate.stop();
  }
  // 清除所有动画
  // lacaMap.viewControl.clearAnimates();
}

function run() {
  if (isPlaying === 0 || isPlaying === 2) {
    let center = g_map?.getCenter().toArray();
    let lastPath = polyline.value.getPath();
    lastPath.push(center);
    // lastPath.push(center);
    // if (lastPath.length === 1) {
    //   lastPath.push(center);
    // }
    polyline.value.setPath(lastPath);
    marker.value.setPosition(center);
    requestAnimationFrame(run);
  }
}

// 轨迹线
function getLine() {
  if (a_map && g_map) {
    polyline.value = new a_map.Polyline({
      path: lineArr,
      isOutline: false,
      strokeColor: "#00E98F",
      strokeOpacity: 1,
      strokeWeight: 10,
      strokeStyle: "solid",
      lineJoin: "round",
      lineCap: "round",
      zIndex: 500,
      map: g_map,
    });
  }
}

async function createCustomMarkerDOM() {
  let getMarkerLabelID = document.getElementById("markerLabelRef");
  // h() 能生成 HTML (超文本标记语言) 的 JavaScript
  const vnode = h(CustomInfoWindow, {
    isPlaying: isPlaying,
    onPlayLine: () => {
      playLine();
    },
    onCarLocation: () => {
      carLocation();
    },
  });
  if (getMarkerLabelID) {
    // console.log("有当前元素id，处理对应逻辑");
  } else {
    // 创建一个新的 div 元素
    let newDiv = document.createElement("div");
    // 为新创建的 div 元素设置 id 属性
    newDiv.setAttribute("id", "markerLabelRef");
    render(vnode, newDiv);
    // console.log("getMarkerLabelID", newDiv);
    return newDiv;
  }
}

// 添加标记点
async function addMarker(position: AMap.LngLat) {
  if (a_map) {
    // 创建自定义Marker内容
    let customMarkerElement = await createCustomMarkerDOM();
    marker.value = new a_map.Marker({
      position: position,
      content: customMarkerElement, //将 html 传给 content
      map: g_map, // 添加到地图上
      offset: new a_map.Pixel(-160, -260), //以 icon 的 [center bottom] 为原点
    });
  }
}

// 移除标记点
function clearMarker() {
  g_map?.remove(marker.value);
}

// 定位车辆位置
function carLocation() {
  console.log("车辆位置");
}
// 地理逆编码
function geocode(lng: number, lat: number) {
  getGeocode(lng, lat).then((res) => {
    console.log(res.data);
  });
  // const geocoder = new a_map.Geocoder({
  //     radius: 1000, //以已知坐标为中心点，radius为半径，返回范围内兴趣点和道路信息
  //     extensions: "all", //返回地址描述以及附近兴趣点和道路信息，默认“base”
  //   });
  //   geocoder.getAddress('北京市朝阳区阜通东大街6号', (status, result) => {
  //     if (status === 'complete' && result.info === 'OK') {
  //       console.log(result.regeocode.formattedAddress); // 输出：北京市朝阳区阜通东大街6号
  //     } else {
  //       console.error(`地理编码失败，错误信息：${status}`);
  //     }
  //   });
}

// 获取天气
function getWeather() {
  //构造 Weather 类
  // let amapWeather = new a_map.Weather();
  //查询实时天气信息，cityName 见 http://restapi.amap.com/v3/config/district?level=city&sublevel=0&extensions=all&output=xml&key=d9fba2f3196b6a4419358693a2b0d9a9
  // amapWeather.getLive("北京");
  //查询四天预报天气，包括查询当天天气信息
  // amapWeather.getForecast("北京");
  // a_map.event.addListener(amapWeather, "complete", function callback() {
  //当查询成功时触发 complete 事件
  // console.log("当查询成功时触发 complete 事件");
  // });
}
// 路线标记点
function addLineMarker(coord: AMap.LngLat) {
  // markerList.value.map((ele) => {
  //   ele.hide();
  // });
  // // 添加标记点
  // marker.value = new a_map.Marker({
  //   position: coord,
  //   map: g_map,
  //   visible: true,
  // });
  // markerList.value.push(marker.value);
}
// 清空路线标记点
function clearMarkers() {
  // markerList.value.forEach((marker) => {
  //   marker.setMap(null);
  // });
  // markerList.value = [];
}

function updateTrack(coords: AMap.LngLat) {
  // 更新轨迹线路径
  // polyline.value.setPath(coords);
}

// 播放轨迹
// function playTrack() {
//   if (!isPlaying.value) return; // 如果已经在播放，则直接返回
//   isPlaying.value = true;
//   currentIndex.value = 0;
//   playNextPoint();
// }
// function playNextPoint() {
//   let bol = currentIndex.value >= polyline.value.getPath().length - 1;
//   // 播放下一个轨迹点
//   if (!isPlaying.value || bol) {
//     isPlaying.value = false; // 停止播放
//     return;
//   }
//   const nextCoord = polyline.value.getPath()[currentIndex.value + 1];
//   console.log("播放轨迹", nextCoord);
//   g_map.setCenter(nextCoord);
//   // g_map.panTo(nextCoord); // 移动地图到下一个轨迹点的位置
//   // marker.value.setPosition(nextCoord)
//   // addLineMarker(nextCoord); // 添加标记点
//   currentIndex.value++;
//   setTimeout(() => {
//     playNextPoint(); // 递归调用，继续播放下一个轨迹点
//   }, 3000); // 每隔1秒播放一个轨迹点
// }

onBeforeUnmount(() => {
  g_map?.destroy();
});
</script>

<style lang="scss" scoped>
.box {
  @include bfc;
}
#GaodeMap {
  height: 100%;
  overflow: hidden;
  border: 1px solid #000;
}

.full {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  padding: 0 !important;
  margin: 0 !important;
  background-color: #fff;
}
</style>
