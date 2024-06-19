<template>
    <loader-component :loader="loader"></loader-component>
    <v-card class="pa-10">
  
      <v-card-title><h2>Lista de Empleados</h2></v-card-title>
      <v-row class="d-flex justify-end my-3">
        <router-link to="/employees/create">
          <v-btn color="secondary"><v-icon>mdi-plus</v-icon>Crear Empleado</v-btn>
        </router-link>
  
      </v-row>
      
      <v-divider></v-divider>
      <v-table>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Legajo</th>
          <th>Nombre Completo</th>
          <th>Correo</th> 
          <th>Celular</th>   
 
          <th>Funcion</th>
          <th>Familiares</th>
          <th class="d-flex justify-end">Acciones</th>
        </tr>
      </thead>
      <tbody >
        <tr v-for="user in list.data" :key="user.id">
          <td>
            <v-avatar><v-img
              :width="300"
              aspect-ratio="16/9"
              cover
              :src="profile.getAvatarUrl(user.name)"
            ></v-img></v-avatar>
          </td>
          <td style="white-space: nowrap;">{{ user.employeeRecord }}</td>
          <td style="white-space: nowrap;">{{ user.name }} {{ user.lastName }}
            <v-chip color="green"> {{ user.category.name??'-' }}</v-chip>
          </td>
            
          <td style="white-space: nowrap;">{{ user.email }}</td>
          <td style="white-space: nowrap;">{{ user.phoneNumber??'-' }}</td>
         
          <td style="white-space: nowrap;">
            <v-chip color="green"> {{ user.function??'-' }}</v-chip>
          </td>
          <td style="white-space: nowrap;"><v-chip color="blue"> {{ user.familyGroups.length??0 }}</v-chip></td>
          <td class="d-flex justify-end align-center">
            <v-btn class="mx-1" @click="()=>{deleteDialogStore.openDialog(user.id, 'Empleado')}" size="35" icon color="red"><v-icon color="white">mdi-trash-can</v-icon></v-btn>  
            <v-btn class="mx-1" @click="openProfile(user.id)" size="35" icon color="primary"><v-icon color="white">mdi-eye</v-icon></v-btn>  
          </td>
        </tr>
      </tbody>
  
  
    </v-table>
  
    <v-pagination
      v-model="page"
      :length="list.meta?.totalPage??1"
      rounded="circle"
      @next="next"
      @update:modelValue="toPage"
      @prev="prev"
    ></v-pagination>
 
    <deleteAnswer @delete="()=>{console.log(deleteDialogStore.idToDelete)}"></deleteAnswer>
  
    </v-card>
  
  
  
    <!-- <v-dialog v-model="employeeStore.createPopUp" >
      <create></create>
    </v-dialog> -->
  
    <!-- <v-dialog v-model="employeeStore.updatePopUp" >
      <update :user="itemToEdit"></update>
    </v-dialog> -->
  
  
        <!-- Dialog to remove professional profile -->
        <!-- <v-dialog persistent v-model="employeeStore.removePopUp">
        <v-row class="d-flex justify-center">
          <v-card class="pa-5" width="600">
            <v-card-title>¿Estas seguro de eliminar este Usuario?</v-card-title>
            <v-row class="d-flex justify-end my-5">
              <v-btn class="mx-5" color="red" @click="removeUser(itemToRemove)">Eliminar</v-btn>
              <v-btn @click="() => { employeeStore.removePopUp = false, itemToRemove = 0 }">Cancelar</v-btn>
            </v-row>
          </v-card>
        </v-row>
      </v-dialog> -->
  
  
  
  </template>
  
  <script lang="ts" setup>
  
  import { useEmployeeStore } from '@/stores/base/Employee/employees.store';
  import { computed, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router';
//   import create  from './create.vue'
//   import update  from './edit.vue'
  import loaderComponent from '@/components/loader.vue'	
  import { useProfileStore } from '@/stores/base/profile';
  import type { UserInterface } from '@/interfaces/users.interface';
  import { useAuthStore } from '@/stores/auth/auth';

  import deleteAnswer from '@/components/helpers/deleteAnswer.vue';
import { useDeleteDialog } from '@/stores/helpers/deleteDialog';
  
  const deleteDialogStore = useDeleteDialog()
  const employeeStore = useEmployeeStore()
  const profile = useProfileStore()
  const authStore = useAuthStore()
  
  let page=1
  const itemToRemove = ref(0)
  const itemToEdit = ref({} as UserInterface)
  let loader=ref(false)
  
  const router = useRouter()
  
  onMounted(async () => {
    await getUsers(1)
  })
  
  async function toPage(page:number)
  {
    await getUsers(page)
  }
  
  function openProfile(__id:number){
    router.push({name:'detailsAndUpdateEmployee',params:{id:__id}})
  }
  
  function next(){
    getUsers(page)
  }
  
  function prev(){
    getUsers(page)
  }

  async function getUsers(__page:number){
    loader.value=true
    await employeeStore.findAll(__page, 10)
    loader.value=false
    
  }
  
  async function removeUser(__id:number){
    loader.value=true
    await employeeStore.remove(__id)
    employeeStore.removePopUp=false
    await employeeStore.findAll(page, 10)
    loader.value=false
  }
  
  const list = computed(()=>{
    return employeeStore.getAll
  })
  
  
  </script>