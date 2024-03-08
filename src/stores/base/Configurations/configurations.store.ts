import type { UserInterface, UsersPaginationsInterface } from "@/interfaces/users.interface"
import webService from "@/webService"
import { defineStore } from "pinia"
import { useToast } from "vue-toastification";
import type { PlantsInterfaceList, StudyInterface, StudyInterfaceList } from "./configurations.interface";

const baseEndpoint = 'configuration'

export const useConfigStore = defineStore('configuration', {
  state: ()=>({
    plants:[] as PlantsInterfaceList,
    studies:[] as StudyInterfaceList,
    createPopUp:false,
    updatePopUp:false,
    removePopUp:false,
    toast: useToast()
  }),
  getters: {
    getAllPlants: (state) => state.plants,
    getAllStudies: (state) => state.studies
  },
  actions: {
    async findAllPlant(): Promise<boolean>{
      try
      {   
        const response =  await webService.get(`${baseEndpoint}/plant`,{
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(response)
        {
          this.plants = response.data
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

    async findAllStudies(): Promise<boolean>{
      try
      {   
        const response =  await webService.get(`${baseEndpoint}/find-all-studies`,{
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(response)
        {
          this.studies = response.data
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