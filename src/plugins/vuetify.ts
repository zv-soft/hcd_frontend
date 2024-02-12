// Styles
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'

import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'


// Vuetify
import { createVuetify } from 'vuetify'


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
         dark:false,
         colors:{
           primary:'#b8477a',
           secondary:'#2E2B5D',
           u_green:'#46AF59',
           background:'667085'
         }
       }
     }
   }
 });


export default vuetify
