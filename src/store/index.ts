import { createPinia } from 'pinia'
// 导入模块
import {useCounterStore} from './modules/counterStore'
import { useLayoutStore } from './modules/layoutStore'
const store = createPinia()

export default store
// 导出模块
export {useCounterStore,useLayoutStore}