// Styles
// Vuetify
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'

// Importa los mensajes en español
import { es } from 'vuetify/locale'

import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'





const vuetify =  createVuetify(
  {  
     icons: {
     defaultSet: 'mdi',
     aliases,
     sets: {
       mdi,
     }
   },
   ...components,
   ...labsComponents,
   theme:{
     themes:{
       light:{
        dark: false,
        colors: {
          primary: '#b8477a',    // Naranja intenso
          secondary: '#2E2B5D',  // Naranja claro
          accent: '#FF7043',     // Naranja coral
          background: '#FFF3E0',  // Crema muy claro
          surface: '#FFFFFF',    // Blanco
          error: '#E53935',      // Rojo
          info: '#1E88E5',        // Azul
          success: '#43A047',    // Verde
          warning: '#FFC107',    // Ámbar
          card: '#E0E0E0',
        }
       }
     }
   },
   // Añade la configuración de locale para español
   locale: {
     locale: 'es',
     fallback: 'en', // Opcional: idioma de respaldo
     messages: { es },
   },
 });


export default vuetify
