<template>
    <div class="bg">
      <slot name="header" />
      <el-row class="screen">
        <el-col class="fullHeight" :span="6">
          <div class="left">
            <span class="angle1" />
            <span class="angle2" />
            <span class="angle3" />
            <span class="angle4" />
            <slot name="left-top" />
          </div>
          <div class="left left_spacing">
            <span class="angle1" />
            <span class="angle2" />
            <span class="angle3" />
            <span class="angle4" />
            <slot name="left-bottom" />
          </div>
        </el-col>
        <el-col class="fullHeight" :span="12">
          <div class="center-top">
            <slot name="center-top" />
          </div>
          <div class="center-bottom center_spacing">
            <span class="angle1" />
            <span class="angle2" />
            <span class="angle3" />
            <span class="angle4" />
            <slot name="center-bottom" />
          </div>
        </el-col>
        <el-col class="fullHeight" :span="6">
          <div class="right">
            <span class="angle1" />
            <span class="angle2" />
            <span class="angle3" />
            <span class="angle4" />
            <slot name="right-top" />
          </div>
          <div class="right left_spacing">
            <span class="angle1" />
            <span class="angle2" />
            <span class="angle3" />
            <span class="angle4" />
            <slot name="right-bottom" />
          </div>
        </el-col>
      </el-row>
    </div>
  </template>
  <script setup lang="ts">
    defineProps({
        ifFull: {
          type: Boolean,
          default: false,
        },
    })
  </script>
  
  <style lang="scss" scoped>
    .fullScreen {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      width: 100%;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    //   overflow: hidden !important;
      .screen,
      .fullHeight {
        box-sizing: border-box;
        height: calc(100% - 20px) !important;
  
        .left,
        .right,
        .center-top,
        .center-bottom {
          height: calc(50% - 50px) !important;
        }
      }
    }
  
    .fullHeight {
      height: calc(100% - 20px);
    }
  
    .bg {
      width: 100%;
      height: 100%;
      background: #03044a;
    }
    .screen {
      width: 100%;
      height: calc(100% - 80px); // 减去头部高度
      padding: 14px 20px 14px 20px;
      color: #fff;
      .left,
      .right,
      .center-bottom {
        position: relative;
        height: calc(50% - 20px);
        padding: 10px;
        overflow: hidden;
        background: #151456;
        border: 1px solid #0d2451;
      }
      @keyframes rotate1 {
        100% {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
  
      @keyframes retate2 {
        100% {
          transform: translate(-50%, -50%) rotate(-360deg);
        }
      }
      .left {
        &_spacing {
          margin-top: 20px;
        }
      }
      .center_spacing {
        margin: 20px 20px 0 20px;
      }
      .center-top {
        height: calc(50% - 20px);
        padding: 0 20px 20px 20px;
      }
    }
    .angle1 {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 10px;
      height: 10px;
      border-top: 1px solid #1c5ab3;
      border-left: 1px solid #1c5ab3;
    }
  
    .angle2 {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      width: 10px;
      height: 10px;
      border-top: 1px solid #1c5ab3;
      border-right: 1px solid #1c5ab3;
    }
  
    .angle3 {
      position: absolute;
      bottom: 0;
      left: 0;
      display: inline-block;
      width: 10px;
      height: 10px;
      border-bottom: 1px solid #1c5ab3;
      border-left: 1px solid #1c5ab3;
    }
  
    .angle4 {
      position: absolute;
      right: 0;
      bottom: 0;
      display: inline-block;
      width: 10px;
      height: 10px;
      border-right: 1px solid #1c5ab3;
      border-bottom: 1px solid #1c5ab3;
    }
  </style>
  