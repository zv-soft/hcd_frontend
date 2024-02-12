import { defineStore } from "pinia"


export const useSettingsStore = defineStore('settings', {
  state: ()=>({
    drawer:true
  }),
  getters: {
    getDrawer: (state) => state.drawer,
  },
  actions: {
    drawerChange() {
      this.drawer = !this.drawer
    },
  },
})