import { createPinia } from 'pinia'
// 没有对应的类型声明文件 "@types/pinia-plugin-persist"
// import piniaPluginPersist from 'pinia-plugin-persist'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 导入模块
import { useCounterStore } from './modules/counterStore'
import { useLayoutStore } from './modules/layoutStore'
import { useLoginStore } from './modules/loginStore'
const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
// 导出模块
export { useCounterStore, useLayoutStore, useLoginStore }
