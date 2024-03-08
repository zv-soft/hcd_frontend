import type { UserInterface, UsersPaginationsInterface } from "@/interfaces/users.interface"
import webService from "@/webService"
import { defineStore } from "pinia"
import { useToast } from "vue-toastification";
import type { EmployeeInterface, EmployeesInterface, EmployeesWithPaginationInterface } from "./employee.interface";

const baseEndpoint = 'employee'

export const useEmployeeStore = defineStore('employee', {
  state: ()=>({
    employees:{} as EmployeesWithPaginationInterface,
    employee:{} as EmployeeInterface,
    createPopUp:false,
    updatePopUp:false,
    removePopUp:false,
    toast: useToast()
  }),
  getters: {
    getAll: (state) => state.employees
  },
  actions: {
    async findAll(page:number, take:number = 10): Promise<boolean>{
      try
      {   
        const response =  await webService.get(`${baseEndpoint}?page=${page}&take=${take}`,{
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(response)
        {
          this.employees = response.data
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

    async findOne(id:number): Promise<null|EmployeeInterface>{
      try
      {
        const response =  await webService.get(`${baseEndpoint}/${id}`,{
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(response.status == 200)
        { 
     
         return response.data
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
        const response =  await webService.post(`${baseEndpoint}`,user, {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(response.status == 201)
        { 
          this.toast.success(response.data.message)
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

    async createFamily(id:number, family:any): Promise<boolean>{
      try
      {
        const params = {
          employeeId:id,
          ...family
        }
        const response =  await webService.post(`${baseEndpoint}/family`,params, {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(response.status == 201)
        { 
          this.toast.success(response.data.message)
          this.employee = await this.findOne(id)
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
    },

    async removeFamily(id:number): Promise<boolean>{
      try
      {
        const response =  await webService.delete(`employee/family/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(response.status == 200)
        { 
          this.toast.success(response.data.message)
          this.employee = await this.findOne(this.employee.id)
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