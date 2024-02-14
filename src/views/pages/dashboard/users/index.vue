<template>
  <loader-component :loader="loader"></loader-component>
  <v-card class="pa-10">

    <v-card-title><h2>Lista de Usuarios</h2></v-card-title>
    <v-row class="d-flex justify-end my-3">
      <router-link to="/users/create">
        <v-btn color="secondary">Crear Usuario</v-btn>
      </router-link>

    </v-row>
    
    <v-divider></v-divider>
    <v-table>
    <thead>
      <tr>
        <th>Foto</th>
        <th>Nombre Completo</th>
        <th>Correo</th> 
        <!-- <th>Celular</th>    -->
        <th class="d-flex justify-end">Acciones</th>
      </tr>
    </thead>
    <tbody >
      <tr v-for="user in listUsers.data" :key="user.id">
        <td>
          <v-avatar><v-img
            :width="300"
            aspect-ratio="16/9"
            cover
            :src="user.profile.image??profile.getAvatarUrl(user.fullName)"
          ></v-img></v-avatar>
        </td>
        <td style="white-space: nowrap;">{{ user.fullName }} 
          <span v-if="isAdmin(user) || isSuperAdmin(user)">
            <v-chip v-if="isAdmin(user)" color="blue">Admin</v-chip>
            <v-chip v-if="isSuperAdmin(user)" color="red">Super Admin</v-chip>
          </span>         
          <span v-else>
            <span v-for="role in user.roles" :key="role.id">
              <v-chip color="green">{{ role.name }}</v-chip>
            </span>
           
          </span>
        </td>
          
        <td style="white-space: nowrap;">{{ user.email }}</td>
        <!-- <td style="white-space: nowrap;">{{ user.profile.phone??'-' }}</td> -->

        <td class="d-flex justify-end align-center">
          <v-btn class="mx-1"  @click="()=>{usersStore.updatePopUp=true, itemToEdit=user}" size="35" icon color="#FF9B26"><v-icon color="black">mdi-pen</v-icon></v-btn>  
          <v-btn class="mx-1" v-if=" !isCurrentUser(user)" @click="()=>{itemToRemove=user.id, usersStore.removePopUp=true}" size="35" icon color="#FF9B26"><v-icon color="black">mdi-delete</v-icon></v-btn>  
          <v-btn class="mx-1" disabled @click="openProfile(user.id)" size="35" icon color="#FF9B26"><v-icon color="black">mdi-eye</v-icon></v-btn>  
        </td>
      </tr>
    </tbody>


  </v-table>
  
  <v-pagination
      v-model="page"
      :length="listUsers.totalPages"
      rounded="circle"
      @next="next"
      @update:modelValue="toPage"
      @prev="prev"
    ></v-pagination>

  </v-card>



  <v-dialog v-model="usersStore.createPopUp" >
    <create></create>
  </v-dialog>

  <v-dialog v-model="usersStore.updatePopUp" >
    <update :user="itemToEdit"></update>
  </v-dialog>


      <!-- Dialog to remove professional profile -->
      <v-dialog persistent v-model="usersStore.removePopUp">
      <v-row class="d-flex justify-center">
        <v-card class="pa-5" width="600">
          <v-card-title>¿Estas seguro de eliminar este Usuario?</v-card-title>
          <v-row class="d-flex justify-end my-5">
            <v-btn class="mx-5" color="red" @click="removeUser(itemToRemove)">Eliminar</v-btn>
            <v-btn @click="() => { usersStore.removePopUp = false, itemToRemove = 0 }">Cancelar</v-btn>
          </v-row>
        </v-card>
      </v-row>
    </v-dialog>



</template>

<script lang="ts" setup>

import { useUsersStore } from '@/stores/base/users';
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import create  from './create.vue'
import update  from './edit.vue'
import loaderComponent from '@/components/loader.vue'	
import { useProfileStore } from '@/stores/base/profile';
import type { UserInterface } from '@/interfaces/users.interface';
import { useAuthStore } from '@/stores/auth/auth';
import {isAdmin, isSuperAdmin}  from '@/components/helpers/helper'


const usersStore = useUsersStore()
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
  router.push({name:'user',params:{id:__id}})
}

function next(){
  getUsers(page)
}

function prev(){
  getUsers(page)
}
async function getUsers(__page:number){
  loader.value=true
  await usersStore.findAll(__page, 10)
  loader.value=false
  
}

async function removeUser(__id:number){
  loader.value=true
  await usersStore.remove(__id)
  usersStore.removePopUp=false
  await usersStore.findAll(page, 10)
  loader.value=false
}

function toTitleCase(str?:string){
  if(!str) return ''
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}



// function isAdmin(user:UserIntrface){
  
//   let isAdmin = false
//   user.roles.forEach((role)=>{
//     if(role.name=='admin') isAdmin=true
//   })

//   return isAdmin
// }


// function isSuperAdmin(user:UserIntrface){
  
//   let isAdmin = false
//   user.roles.forEach((role)=>{
//     if(role.name == 'superadmin') isAdmin=true
//   })

//   return isAdmin
// }

function isCurrentUser(user:UserInterface){
  return user.id==authStore.user.id
}

const listUsers = computed(()=>{
  return usersStore.getUsers
})


</script>