<template>
    <div :id="echartId" :style="{ width: eWidth, height: eHeight }"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, onBeforeUnmount } from 'vue';
import './china.js'

const props = defineProps({
    echartId: {
        type: String,
        require: true,
        default: 'wan-echart'
    },
    eWidth: {
        type: String,
        default: '500px'
    },
    eHeight: {
        type: String,
        default: '300px'
    },
    option: {
        type: Object,
        require: true,
        default: () => { }
    }
})

onMounted(() => {
    init()
})

function init() {
    let myChart = echarts.init(document.getElementById(props.echartId) as HTMLElement);
    myChart.setOption(props.option)
    
    myChart.on('click',(e) => {
        console.log(e);
    })

}

onBeforeUnmount(() => {
    // console.log('销毁');
})

</script>