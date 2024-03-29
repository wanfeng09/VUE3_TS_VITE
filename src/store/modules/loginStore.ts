import { defineStore } from 'pinia'
export const useLoginName = defineStore('loginName',{
    state: () => ({
         username: '',
         password: ''
    }),
    getters: {},
    actions: {
         setLoginName(val: string){
             this.username = val
         }
    }
 })
 