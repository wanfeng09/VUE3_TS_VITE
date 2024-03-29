import { defineStore } from 'pinia'
export const useLoginStore = defineStore('loginName',{
    state: () => ({
         username: '',
         password: ''
    }),
    getters: {},
    actions: {
         setLoginName(val: string){
             this.username = val
             localStorage.setItem('h-username',val)
         }
    }
 })
 