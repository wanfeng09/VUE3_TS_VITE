# 地图

[文档地址](https://lbs.amap.com/api/javascript-api-v2/guide/map/3d-map#s5)
[实时轨迹监控](https://geohub.amap.com/demo/uj69b)
[loca数据可视化](https://lbs.amap.com/api/loca-v2/intro)
[amap-jsapi-loader](https://www.npmjs.com/package/@amap/amap-jsapi-loader)

> npm i @amap/amap-jsapi-loader --save

```html
<div id="GaodeMap" />
```

```js
import AMapLoader from '@amap/amap-jsapi-loader'
import { ref } from 'vue'
let fullVal = ref < Boolean > false
function init() {
  AMapLoader.load({
    key: '你的apikey',
    version: '2.0'
  })
    .then((AMap) => {
      let map = new AMap.Map('GaodeMap', {
        zoom: 11, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: '3D', //使用3D视图
        pitch: 50 // 地图俯仰角度，有效范围 0 度- 83 度
      })
    })
    .catch((e) => {
      console.log(e)
    })
}

init()
```
