import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 导入模块
import { useCounterStore } from './modules/counter'
import { useConfigStore } from './modules/config'
import { useTagsStore } from './modules/tags'
const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
// 导出模块
export { useCounterStore, useConfigStore, useTagsStore }
