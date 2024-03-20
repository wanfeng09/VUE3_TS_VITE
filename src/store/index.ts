import { createPinia } from 'pinia'
// 导入模块
import {useCounterStore} from './modules/counterStore'
const store = createPinia()

export default store
// 导出模块
export {useCounterStore}