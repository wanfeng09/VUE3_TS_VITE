/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module 'element-plus/dist/locale/en.mjs'
declare module 'element-plus/dist/locale/zh-cn.mjs'
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_URL: string
  readonly VITE_APP_PREFIX: string
  readonly VITE_APP_PORT: string
  // 更多环境变量...
}
