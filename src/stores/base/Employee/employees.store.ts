import type { UserInterface, UsersPaginationsInterface } from "@/interfaces/users.interface"
import webService from "@/webService"
import { defineStore } from "pinia"
import { useToast } from "vue-toastification";
import type { EmployeeInterface, EmployeeReceiptInterface, EmployeesInterface, EmployeesWithPaginationInterface, ReceiptListInterface } from "./employee.interface";


const baseEndpoint = 'employee'

export const useEmployeeStore = defineStore('employee', {
  state: ()=>({
    employees:{} as EmployeesWithPaginationInterface,
    employeesList: [] as EmployeeInterface[],
    employee:{} as EmployeeInterface,
    receiptList: [] as ReceiptListInterface[],
    createPopUp:false,
    updatePopUp:false,
    removePopUp:false,
    toast: useToast()
  }),
  getters: {
    getAll: (state) => state.employees
  },
  actions: {

    async findAllWithPagination(page:number, take:number = 10): Promise<boolean>{
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
    async findAll(): Promise<boolean>{
      try
      {   
        const response =  await webService.get(`${baseEndpoint}`,{
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(response)
        {
          this.employeesList = response.data
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

    async findOneReceiptByID(id:number, month:string, year:string, category:string): Promise<null|EmployeeReceiptInterface>{
      try
      {
        const response =  await webService.get(`${baseEndpoint}/receipt/${id}/${month}/${year}/${category}`,{
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

    async createFamily(id:number, family:FormData): Promise<boolean>{
      try
      {
        // const params = {
        //   employeeId:id,
        //   ...family
        // }
        const response =  await webService.post(`${baseEndpoint}/family`, family, {
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

    async updateFamily(id:number, family:any): Promise<boolean>{
      try
      {
        const response =  await webService.patch(`${baseEndpoint}/family/${id}`, family, {
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

    async createAdjustment(id:number, adjustment:any): Promise<boolean>{
      try
      {
        const params = {
          employeeId:id,
          ...adjustment
        }
        const response =  await webService.post(`${baseEndpoint}/ordinance-adjustments`,params, {
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

    async update(id:number, employee:any): Promise<boolean>{
      try
      {
        const users =  await webService.patch(`${baseEndpoint}/${id}`, employee, {
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
    },

    async removeAdjustment(id:number): Promise<boolean>{
      try
      {
        const response =  await webService.delete(`employee/ordinance-adjustments/${id}`, {
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
    },


    async uploadReceipts(params:FormData): Promise<boolean>{
      

      console.log(params['file'])
        try
        {
          const response =  await webService.post(`${baseEndpoint}/upload-salary-receipt`, params, {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              Accept: "multipart/form-data",
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

      return true
    },
    


    async getReceiptsList(page:number=1, skype:number=10): Promise<boolean>{

      try{

      const response =  await webService.get(`${baseEndpoint}/receipt`, {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })


      console.log(response)

      if(response.status == 200)
      { 
   
        this.receiptList = response.data
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