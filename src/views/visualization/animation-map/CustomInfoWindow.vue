<template>
  <div style="width: 326px; font-size: 12px; color: #333">
    <div
      style="
        box-shadow: 0 0 9px #9c9898;
        border-radius: 9px;
        padding: 10px 5px 0 5px;
        box-sizing: border-box;
        background-color: #fff;
        position: relative;
      "
    >
      <div>设备名称：88888888</div>
      <div>设备类型：无线</div>
      <div>设备状态：离线（1天13时16分8秒）</div>
      <div>定位类型：基站定位</div>
      <div>定位时间：2024-03-13 13:16:08</div>
      <div>通讯时间：2024-03-13 13:16:08</div>
      <div>今日里程：0KM</div>
      <div>总里程：2000KM</div>
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          color: #000;
          padding: 10px 0;
        "
      >
        <el-icon color="#0078d4" size="22"><i-ep-Location /></el-icon>
        <div>广东省广州市花都区xxxxxxxxxxxxxxxxx121米</div>
      </div>
      <div
        style="
          background-color: #fbfbfb;
          padding: 5px 8px;
          display: flex;
          flex-direction: row;
          align-items: center;
        "
      >
        <div style="padding-right: 10px">
          <el-icon
            v-if="isPlaying === 2 || isPlaying === 0"
            color="#0078d4"
            size="18"
            @click.stop="playLine"
          >
            <i-ep-VideoPause />
          </el-icon>
          <el-icon v-else color="#0078d4" size="18" @click.stop="playLine">
            <i-ep-VideoPlay />
          </el-icon>
        </div>
        <div>
          <el-icon color="#0078d4" size="18" @click.stop="carLocation"
            ><i-ep-Aim
          /></el-icon>
        </div>
      </div>
      <div
        style="
          position: absolute;
          bottom: -10px;
          left: 50%;
          z-index: 999999;
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: -7px;
          border-top: 10px solid;
          border-right: 7px solid transparent;
          border-left: 7px solid transparent;
          color: #fff;
        "
      />
    </div>
    <div style="text-align: center;margin-top: 20px;transform: rotate(90deg);'">
      <img src="@/assets/img/car.png" alt="" srcset="" />
    </div>
  </div>
</template>

<script setup lang="ts">
// 必须按需导入
defineProps({
  isPlaying: {
    type: Number,
    default: 4,
    required: false,
  },
});
const emit = defineEmits(["playLine", "carLocation"]);
function playLine() {
  emit("playLine");
}

function carLocation() {
  emit("carLocation");
}
</script>
