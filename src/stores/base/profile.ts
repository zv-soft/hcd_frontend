import { defineStore } from "pinia"


export const useProfileStore = defineStore('profile', {
  state: ()=>({
    profile_img:'https://ui-avatars.com/api/?name=Administrador&background=0D8ABC&color=fff&size=128'
  }),
  getters: {
    getProfile: (state) => state,
  },
  actions: {

    getAvatarUrl(name:string){
      return `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff&size=128`
    }
  
  },
})