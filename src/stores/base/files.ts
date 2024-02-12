import type { EventInterface, EventsPaginationInterface } from "@/interfaces/events.interface"
import type { FileInterface } from "@/interfaces/fles.interface"
import webService from "@/webService"
import { defineStore } from "pinia"


export const useFilesStore = defineStore('files', {
  state: ()=>({}),
  getters: {},
  actions: {
  

    async create(image:{file:any}):Promise<boolean|FileInterface>{
      try
      {
        const res =  await webService.post(`files/image`,image,{
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(res.status == 201)
        { 
         return res.data
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





    
  
  },
})