import { defineStore } from 'pinia' 
export const useLoginStore = defineStore('loginName', {
  state: () => ({
    username: '',
    password: ''
  }),
  getters: {},
  actions: {
    setLoginName(val: string) {
      this.username = val
    }
  },
  /**
   * pinia-plugin-persist插件用法
   * 开启数据缓存，默认缓存所有state，通过指定paths指定要长久化的字段，默认存储sessionStorage
   * persist: {
    enabled: true,
    strategies: [
      //   {
      //       key: 'username', // 设置存储的key
      //       storage: localStorage // 修改存储位置
      //   }
      {
        paths: ['username'], // 指定要长久化的字段
        storage: localStorage
      }
    ]
  }
   */
  // 
  persist: {
    paths: ['username'],
  }
})
