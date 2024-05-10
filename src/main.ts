import { createApp } from 'vue'
import './styles/tailwind.css'
// svg-icons
import 'virtual:svg-icons-register'
// 注册全局
import SvgIcon from './components/SvgIcon/SvgIcon.vue'

import App from './App.vue'
// 导入store
import pinia from './stores'
// 导入路由
import router from './router'
// 导入i18n
import i18n from '@/lang'
const app = createApp(App)

app.use(pinia)
// 注册i18n
app.use(i18n)
// 注册路由
app.use(router)
app.component('svg-icon', SvgIcon)
app.mount('#app')
