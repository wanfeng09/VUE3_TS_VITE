import { defineStore } from 'pinia'
export const useLoginStore = defineStore('loginName',{
    state: () => ({
         username: '',
         password: ''
    }),
    getters: {
        getLoginName(): string {
            if(localStorage.getItem('h-username')){
               this.username = localStorage.getItem('h-username') as string
                return this.username || '异常'
            }else{
                return ''
            }
        }
    },
    actions: {
         setLoginName(val: string){
             this.username = val
             localStorage.setItem('h-username',val)
         }
    }
 })
 