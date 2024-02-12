import type { Role, RoleWithPagination } from "@/interfaces/roles.interface"
import webService from "@/webService"
import { defineStore } from "pinia"


export const useRolesStore = defineStore('roles', {
  state: ()=>({
    rolesWithPagination:{} as RoleWithPagination,
    roles:[] as Role[],
    createPopUp:false,
    updatePopUp:false,
    removePopUp:false,
  }),
  getters: {
    getRoles: (state) => state.roles,
    getRolesPagination: (state) => state.rolesWithPagination
  },
  actions: {

    async findAll(): Promise<boolean>{
        try
        {
          const res =  await webService.get(`roles`,{
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
          })
  
          if(res)
          {
            this.roles = res.data
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
  

    async findAllWithPagination(page:number, take:number = 10): Promise<boolean>{
      try
      {
        const users =  await webService.get(`roles?page=${page}&take=${take}`,{
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })

        if(users)
        {
          this.rolesWithPagination = users.data
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

    // async findOne(id:number): Promise<null|UserIntrface>{
    //   try
    //   {
    //     const users =  await webService.get(`user/${id}`,{
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Requested-With": "XMLHttpRequest",
    //         Accept: "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("access_token")}`
    //       }
    //     })

    //     if(users.status == 200)
    //     { 
     
    //      return users.data
    //     }
    //     else 
    //     {
    //       return null
    //     }
    //   }
    //   catch(err)
    //   {
    //     return null
    //   }
    
    // },

    // async create(user:any): Promise<boolean>{
    //   try
    //   {
    //     const users =  await webService.post(`user`,user, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Requested-With": "XMLHttpRequest",
    //         Accept: "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("access_token")}`
    //       }
    //     })

    //     if(users.status == 201)
    //     { 
    //      return true
    //     }
    //     else 
    //     {
    //       return false
    //     }
    //   }
    //   catch(err)
    //   {
    //     return false
    //   }
    
    // },

    // async update(id:number, user:any): Promise<boolean>{
    //   try
    //   {
    //     const users =  await webService.patch(`user/${id}`,user, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Requested-With": "XMLHttpRequest",
    //         Accept: "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("access_token")}`
    //       }
    //     })

    //     if(users.status == 200)
    //     { 
    //      return true
    //     }
    //     else 
    //     {
    //       return false
    //     }
    //   }
    //   catch(err)
    //   {
    //     return false
    //   }
    
    // },

    // async remove(id:number): Promise<boolean>{
    //   try
    //   {
    //     const users =  await webService.delete(`user/${id}`, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Requested-With": "XMLHttpRequest",
    //         Accept: "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("access_token")}`
    //       }
    //     })

    //     if(users.status == 201)
    //     { 
    //      return true
    //     }
    //     else 
    //     {
    //       return false
    //     }
    //   }
    //   catch(err)
    //   {
    //     return false
    //   }
    // }



    
  
  },
})