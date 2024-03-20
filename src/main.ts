import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 导入i18n
import i18n from '@/lang'
// 导入路由
import router from './router'

import pinia from './store'
const app = createApp(App)
// 注册i18n
app.use(i18n)
// 注册路由
app.use(router)
// 注册pinia
app.use(pinia)
app.mount('#app')
