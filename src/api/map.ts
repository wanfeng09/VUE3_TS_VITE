import axios from 'axios'

// 并不是前端调用，后端处理
export function getGeocode(lng: number, lat: number) {
  return axios.get('https://restapi.amap.com/v3/geocode/regeo', {
    params: {
      output: 'xml',
      location: `${lng},${lat}`,
      key: import.meta.env.VITE_MAP_SERVICE_KEY,
      radius: 1000,
      extensions: 'all'
    }
  })
}
