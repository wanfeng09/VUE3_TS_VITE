<template>
    <div id='h-map'></div>
</template>
   
<script setup lang="ts">
import 'ol/ol.css'
import { Map, View, Feature } from 'ol'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import Cluster from 'ol/source/Cluster'
import { Vector as VectorLayer, Tile as TileLayer } from 'ol/layer'
import { Style, Fill as StyleFill, Stroke as StyleStroke, Circle as StyleCircle, Text as StyleText } from 'ol/style'
import { Circle as GeomCircle, Point as GeomPoint, LineString as GeomLineString, Polygon as GeomPolygon } from 'ol/geom'
import { Draw as InteractionDraw } from 'ol/interaction'
import { onMounted } from 'vue'

onMounted(() => {
    initMap()
})

function initMap() {
    let map = new Map({
        target: 'h-map',
        layers: [
            new TileLayer({
                source: new OSM({})
            }),
        ],
        view: new View({
            // 设置中心点，广东
            center: [113.12244, 23.009505],
            projection: 'EPSG:4326',
            // 设置缩放倍数
            zoom: 17,
            minZoom: 6,
            maxZoom: 20
        })
    })
    map.on('click',function(){
        console.log('点击事件');
    })
}

</script>
   
<style lang="scss" scoped>
@include s(map) {
    width: 100%;
    height: 100%;
}
</style>