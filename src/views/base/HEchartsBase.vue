<script setup lang="ts" >
import HEchart from '@/components/HEchart/HEchart.vue'

const option1 = {
    title: {
        text: '柱状图'
    },
    tooltip: {},
    xAxis: {
        data: ['A', 'B', 'C', 'D', 'E', 'F']
    },
    yAxis: {},
    series: [
        {
            name: 'test1',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        },
        {
            name: 'test2',
            type: 'bar',
            data: [15, 3, 16, 16, 0, 30]
        }
    ]
}
const option2 = {
    xAxis: {
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    },
    yAxis: {},
    series: [
        {
            type: 'scatter',
            data: [220, 182, 191, 234, 290, 330, 310],
            symbolSize: 20,
            symbol:
                'path://M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z'
        }
    ]
};
const option3 = {
    legend: {
        orient: 'vertical',
        x: 'left',
        data: ['A', 'B', 'C', 'D', 'E']
    },
    series: [
        {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                show: false
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            data: [
                { value: 335, name: 'A' },
                { value: 310, name: 'B' },
                { value: 234, name: 'C' },
                { value: 135, name: 'D' },
                { value: 1548, name: 'E' }
            ]
        }
    ]
};

const option4 = {
    xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E', 'F']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Step Start',
            type: 'line',
            step: 'start',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: 'Step Middle',
            type: 'line',
            step: 'middle',
            data: [220, 282, 201, 234, 290, 430, 410]
        },
        {
            name: 'Step End',
            type: 'line',
            step: 'end',
            data: [450, 432, 401, 454, 590, 530, 510]
        }
    ]
};

</script>
<template>
    <div class="h-contain h-flex">
        <HEchart echartId="test1" :option="option1" />
        <HEchart echartId="test2" :option="option2" />
        <HEchart echartId="test3" :option="option3" />
        <HEchart echartId="test4" :option="option4" />
    </div>
</template>
<style lang="scss" scoped>
@include s(flex) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
</style>
