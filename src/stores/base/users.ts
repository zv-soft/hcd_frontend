import type { UserInterface, UsersPaginationsInterface } from "@/interfaces/users.interface"
import webService from "@/webService"
import { defineStore } from "pinia"
import { useToast } from "vue-toastification";


export const useUsersStore = defineStore('users', {
  state: ()=>({
    users:{} as UsersPaginationsInterface,
    createPopUp:false,
    updatePopUp:false,
    removePopUp:false,
    toast: useToast()
  }),
  getters: {
    getUsers: (state) => state.users
  },
  actions: {
    async findAll(page:number, take:number = 10): Promise<boolean>{
      try
      {   
        const users =  await webService.get(`user?page=${page}&take=${take}`,{
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(users)
        {
          this.users = users.data
          return true
        }
        else 
        {
          return false
        }
      }
      catch(err)
      {
        return false
      }
    
    },

    async findOne(id:number): Promise<null|UserInterface>{
      try
      {
        const users =  await webService.get(`user/${id}`,{
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(users.status == 200)
        { 
     
         return users.data
        }
        else 
        {
          return null
        }
      }
      catch(err)
      {
        return null
      }
    
    },

    async create(user:any): Promise<boolean>{
      try
      {
        const users =  await webService.post(`user`,user, {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(users.status == 201)
        { 
          this.toast.success(users.data.message)
          return true
        }
        else 
        {
        
          return false
        }
      }
      catch(err:any)
      {
        this.toast.error(err.response.data.message)
        return false
      }
    
    },

    async update(id:number, user:any): Promise<boolean>{
      try
      {
        const users =  await webService.patch(`user/${id}`,user, {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(users.status == 200)
        { 
         return true
        }
        else 
        {
          return false
        }
      }
      catch(err)
      {
        return false
      }
    
    },

    async remove(id:number): Promise<boolean>{
      try
      {
        const users =  await webService.delete(`user/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(users.status == 201)
        { 
         return true
        }
        else 
        {
          return false
        }
      }
      catch(err)
      {
        return false
      }
    }   
  
  },
})