import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'



import Toast, { POSITION }  from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  position: POSITION.TOP_RIGHT
};

loadFonts()

const app = createApp(App)

const pinia = createPinia()


  app.use(router)
  app.use(vuetify)
  app.use(pinia)

  app.use(Toast, options);


  app.mount('#app')
  
