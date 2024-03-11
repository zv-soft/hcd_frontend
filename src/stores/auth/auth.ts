import type { AuthInterface } from "@/interfaces/user.interface"
import webService from "@/webService"
import { defineStore } from "pinia"
import { useToast } from "vue-toastification"


export const useAuthStore = defineStore('auth', {
  
  state: ()=>({
    user:{} as AuthInterface,
    token:null,
    toast: useToast()
  }),
  getters: {
    getUser: (state) => {
      const user =localStorage.getItem('user') 
      if(user)
        state.user = JSON.parse(user)
      return state.user
    }
  },
  actions: {
     async login(data:{email:string, password:string}){
      //TODO LOGIN REQUEST

     
        const res = await webService.post('auth/signin', data, {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
          }
        })
       
     
        if(res)
        {
          localStorage.setItem('access_token', res.data.token)  
          this.token = res.data.token         
          localStorage.setItem('user', JSON.stringify(res.data))  
          this.user = res.data  
          this.toast.success(`Bienvenido ${res.data.fullName}`)
          return true
        }
        else return false
 
    },
    async checkAuthStatus(){

      try
      {
        const res = await webService.get('/auth/checkAuthStatus',{
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(res)
        {
          localStorage.setItem('token', JSON.stringify(res.data.token))  
          this.token = res.data.token         
          localStorage.setItem('user', JSON.stringify(res.data))  
          this.user = res.data  
          return true
        }
        else
        {
          localStorage.removeItem('user')
          localStorage.removeItem('access_token')
          return false
        } 

      }
      catch(err){
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
        return false
      }


    },
    async logout(){
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      this.$reset
    },   
  
  },
})