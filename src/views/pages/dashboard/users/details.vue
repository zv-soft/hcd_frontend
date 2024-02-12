<template>

      <v-row class="d-flex justify-center">
        <v-progress-circular v-if="loader" width="7" color="primary" size="50" indeterminate model-value="60"></v-progress-circular>
        <v-card v-else class="pa-10" :width="cv==null?'90%':'40%'">
          <router-link  to="/users">
            <v-btn class="my-5" icon="mdi-arrow-left-bold" color="secondary"></v-btn>
          </router-link>
          
          <h2><strong>Nombre:</strong> {{ user?.fullName }}</h2>
          <v-list>
            <v-list-item :title="null">
              <v-chip :color=" user?.isActive?'green':'red' ">{{ user?.isActive?'Activo':'Inactivo' }}</v-chip>
              <v-chip :color=" user?.enable_shared?'green':'red' ">{{ user?.enable_shared?'Quiere compartir':'No Quiere compartir' }}</v-chip>
            </v-list-item>
            <v-list-item :title="null"><strong>Correo</strong>: {{ user?.email }}</v-list-item>
            <v-list-item :title="null"><strong>Numero de Identificación: </strong>{{ user?.dni }} | <strong>Código Uniandes:</strong>  {{ user?.uniandes_code }}</v-list-item>

            <v-list-item :title="null">
              <strong>Fecha de Nacimiento:</strong> {{ user?.dob }} |
              <strong>Estado Civil:</strong> {{ user?.profile.civil_status }} |
              <strong>Género:</strong> {{ user?.gender }}
            </v-list-item>

            <v-list-item :title="null">
              <strong>Ciudad de residencia:</strong> {{ user?.profile.city }} |
              <strong>País:</strong> {{ user?.profile.country_residence }} |
              <strong>Nacionalidad:</strong> {{ user?.profile.nationality }}
            </v-list-item>

            
            <v-list-item :title="null">
              <strong>Celular</strong> {{ user?.profile.phone }} |             
                 
              <strong>Correo Secundario:</strong> {{ user?.profile.secondary_email }} |
      
                  <v-btn @click="link(user?.profile.linkedin_url)" density="compact" color="secondary"><strong>Linkedin:</strong> </v-btn>
              
            </v-list-item>

          </v-list>
          <v-card elevation="10" color="white" class="pa-8">
            <v-card-title><h2>Curriculums</h2></v-card-title>
            <v-list class="bg-white">
            <v-list-item  :title="null"
              v-for="cv in user?.curriculums " 
              key="cv.id"
             
              >
              <v-list-item-title>{{ cv.professional_profile }}</v-list-item-title>
              <v-list-item-subtitle>{{ cv.type }}</v-list-item-subtitle> 
              <template v-slot:append>
              <v-btn
                class="mx-2"
                color="u_green"
                icon="mdi-eye"
                @click="toCurriculum(cv.id)"
              ></v-btn>
              <v-btn
                class="mx-2"
                color="secondary"
                icon="mdi-arrow-right"
                @click="showDetail(cv)"
              ></v-btn>
            </template>

            <v-divider></v-divider>
              
            </v-list-item>
          </v-list>

          </v-card>
        
        </v-card>


        <v-fab-transition>

          <v-card width="50%" v-if="cv" class="mx-10 pa-10">
          <v-card-title> 
            <v-row>            
              <h2>Detalle</h2>
              <v-spacer></v-spacer>
              <v-btn color="red"  size="20" class="my-auto" small @click="cv=null" ><v-icon size="15" icon="mdi-close"></v-icon></v-btn>
            </v-row>
    
           
          
          </v-card-title>

          <v-card v-if="cv.img_url" class="my-5" elevation="6" width="100">
            <v-img
            :width="100"
            aspect-ratio="16/9"
            cover
            :src="cv.img_url"
          ></v-img>
          </v-card>
          
   

          <v-divider class="my-5"></v-divider>      
          <p v-if="cv.professionalProfile!=null"><strong class="text-h5 font-weight-bold">Perfil:  </strong> {{ cv.professionalProfile!.name}}</p>
          <v-divider  v-if="cv.professionalProfile!=null" class="my-3"></v-divider>
          <div v-for="(item, index) in cv" :key="index">
      
            <span v-if=" (typeof item) != 'object' ">
              <span v-if="index=='img_url'">
           
              </span>
              <div v-else>                
                <strong  v-if="index!='id'">{{traslate(index)}}: </strong>
                <span v-if="index!='id'">{{ item }}</span>
              </div>            
            </span>     
            <span v-else-if=" (typeof item) == 'object' ">
              <span v-for="(detail, indexItem) in item" :key="indexItem">

                <!-- <div v-if="index.toString() == 'professionalProfile'">    
                 <h3>{{ traslate(index) }}</h3> 
                  {{ item!.name!.toString() }}
                </div> -->
            
                <div v-if="index.toString() != 'style' && index.toString() != 'professionalProfile'">                
                  <v-divider class="my-3"></v-divider>
                  <h3>{{ traslate(index) }} </h3>

                  <p class="ml-2" v-for="(element, i) in detail" :key="i">
                    <div v-if="i.toString()=='read_only'">
                      <v-chip color="secondary" v-if="element != null && element.toString() == 'true'"><strong class="black--text">Desde Uniandes</strong></v-chip>
                  </div>
                  </p>
                
                  <p class="ml-2" v-for="(element, i) in detail" :key="i">
              
                    <div v-if="i.toString()!='read_only'">
                      <strong  v-if="i.toString()!='id'">{{traslate(i)}}: </strong>
                      <span v-if="i.toString()!='id'">{{ element }}</span>
                    </div>       
                   
                  </p>
              </div>  
              
              </span>
            </span>
          </div>
         
          <h4  >
            
          
          </h4>
        </v-card>

        </v-fab-transition>
      
      </v-row>
    


</template>


<script lang="ts" setup>

import type { Curriculum } from '@/interfaces/user.interface';
import type { UserIntrface } from '@/interfaces/users.interface';
import { useUsersStore } from '@/stores/base/users';
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router' 

const usersStore = useUsersStore()

let page=1
let loader=ref(false)
let user=ref<UserIntrface|null>()

let cv=ref<Curriculum|null>()

const router = useRouter()

onMounted(async () => {

  if(router.currentRoute.value.params.id && router.currentRoute.value.params.id != undefined){
    await getUsers(Number(router.currentRoute.value.params.id)) 
  }

})

function toCurriculum(__id:number){
 window.open(`https://create-cv-uniandes.vercel.app/ver-curriculum/${__id}`,'_blank')
}

function showDetail(__cv:Curriculum){
  cv.value=__cv
}

function link(url:string)
{
  window.open(url,'_blank')
}

function traslate(__key:string|number){  
  switch (__key) {
    case 'professional_profile':      return 'Perfil Profesional'
    case 'professional_experiences':  return 'EXPERIENCIA PROFRESIONAL'
    case 'educations':                return 'EDUCACION'
    case 'curses':                    return 'CURSOS'
    case 'languages':                 return 'IDIOMAS'
    case 'description':               return 'Descripción'
    case 'company_name':              return 'Nombre de la Compañia'
    case 'university':                return 'Universidad'
    case 'undergraduate_program':     return 'Programa de Pregrado'
    case 'type':                      return 'Tipo' 
    case 'level':                     return 'Nivel'   
    case 'job_title':                 return 'Cargo'      
    case 'average':                   return 'Promedio'   
    case 'name':                      return 'Nombre'
    case 'softwares':                 return 'SOFTWARES'
    case 'merits':                    return 'MERITOS'
    case 'achievements':              return 'LOGROS'
    case 'end_date':                  return 'Fecha de Finalizacion'
    case 'start_date':                return 'Fecha de Inicio'
    case 'professionalProfile':       return 'Perfil Profesional'
    default:                          return __key
  }
}



async function getUsers(__id:number){
  loader.value=true
  user.value = await usersStore.findOne(__id)
  loader.value=false
}

const listUsers = computed(()=>{
  return usersStore.getUsers
})


</script>