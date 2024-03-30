import { createI18n } from 'vue-i18n'
// https://vue-i18n.intlify.dev/guide/advanced/composition
// User defined lang
import enLocale from './en'
import zhLocale from './zh'
import zhCnEle from 'element-plus/dist/locale/zh-cn.mjs'
import enEle from 'element-plus/dist/locale/en.mjs'

const messages = {
  en: {
    ...enEle,
    ...enLocale
  },
  zh: {
    ...zhCnEle,
    ...zhLocale
  }
}

// export const getLocale = () => {
//   return "en";
// };
const i18n = createI18n({
  // 使用 composition API
  legacy: false,
  // 全局使用 t函数(默认开启)
  // globalInjection: true,
  locale: 'zh', // set locale
  fallbackLocale: 'zh', // set fallback locale
  messages
})

export default i18n
