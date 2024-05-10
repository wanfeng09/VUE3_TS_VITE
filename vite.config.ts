import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

import path from 'path'
// import tailwindcss from 'tailwindcss'

// 获取.env.dev中的变量
const env = loadEnv('dev', process.cwd())
console.log(env, '开发环境变量')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: parseInt(env.VITE_APP_PORT),
    host: true,
    open: true,
    proxy: {
      // 选项写法
      [env.VITE_APP_PREFIX]: {
        target: env.VITE_APP_URL, //填写代理地址
        changeOrigin: false,
        rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_PREFIX), '')
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
      symbolId: 'icon-[dir]-[name]'
    }),
    // mock模拟数据
    viteMockServe({
      mockPath: 'mock',
      enable: true
    })
    // tailwindcss({
    //   config: 'tailwind.config.js'
    // })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "/src/styles/index.scss";`
      }
    }
  }
})
