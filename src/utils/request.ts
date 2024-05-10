import axios from 'axios'
import { useConfigStore } from '@/stores/index'
import { ElMessage } from 'element-plus'

const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_PREFIX,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const configStore = useConfigStore()
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (configStore.token && !isToken) {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Authorization'] = 'Bearer ' + configStore.token
    } else {
      console.log('no token')
    }
    return config
  },
  (error) => {
    // 请求错误处理
    ElMessage.error(error.data.msg)
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    // console.log('response---', response)
    // 未设置状态码则默认成功状态
    const code = response.data.code || 200
    if (code != 200) {
      ElMessage.error(response.data.msg)
      return Promise.reject(response)
    }
    return response.data
  },
  (error) => {
    // 响应错误处理
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)
export default service
