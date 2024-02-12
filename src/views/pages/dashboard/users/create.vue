<template>

      <loader-component :loader="loader"></loader-component>
      <v-card class="pa-10">

      
      <v-card-title>
        <ReturnButton route="/users" />
        <h2>Crear nuevo Usuario</h2></v-card-title>
      <loader-component :loader="loader"></loader-component>

       
        <v-divider class="my-2"></v-divider>
        <v-form v-model="valid" @submit.prevent="create" ref="form">

          <v-row>
            <!-- Full Name -->
            <v-col cols="12" md="6">
              <v-text-field name="name" label="Nombre" class="mb-2" required :rules="titleRule"
                v-model="user.fullName" variant="outlined">
              </v-text-field>  
            </v-col>

            <!-- Email -->
            <v-col cols="12" md="6">
              <v-text-field name="email" label="Email" class="mb-2" required :rules="emailRule"
                v-model="user.email" variant="outlined">
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Password -->
            <v-col cols="12" md="6">
              <v-text-field 
                :type="showPassword"
                name="password" 
                label="Password"
                class="mb-2" 
                required
                append-inner-icon="mdi-eye"
                @click:append-inner="togglePassword"
                :rules="passwordRule"
                v-model="user.password" 
                variant="outlined">
              </v-text-field>
            </v-col>

            <!-- Password Confirmation -->
            <v-col cols="12" md="6">
              <v-text-field 
                name="password_confirmation" 
              
                label="Confirmar Password" 
                class="mb-2" 
                required 
                :type="showPasswordConfirmation"
                append-inner-icon="mdi-eye"
                @click:append-inner="togglePasswordConfirmation"
                :rules="passwordConfirmationRule"
                v-model="user.passwordConfirmation" 
                variant="outlined">
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="user.role"
                :items="rolesStore.getRoles"
                item-title="name"
                item-value="id"
                required
                outlined
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>
      
          <v-row class="d-flex justify-end">
            <v-btn class="mx-5" @click="() => { userStore.createPopUp = false }" color="red">Cancelar</v-btn>
            <v-btn type="submit" color="green">Crear</v-btn>
          </v-row>
        </v-form>


      </v-card>
  

  </template>

<script lang="ts" setup>
import { useUsersStore } from '@/stores/base/users';
import LoaderComponent from '@/components/loader.vue'
import ReturnButton from '@/components/helpers/returnButton.vue'
import { ref, onBeforeMount } from 'vue';
import { useRolesStore } from '@/stores/base/roles';

import { useRouter } from 'vue-router';

const router = useRouter()

const loader = ref(false)
const titleRule = ref([(v: string) => {
  return !!v || 'El nombre es requerido'
}])
const emailRule = ref([(v: string) => {
  return !!v || 'El email es requerido'
}])
const passwordRule = ref([(v: string) => {
  return !!v || 'El password es requerido'
}])
const passwordConfirmationRule = ref([(v: string) => {
  return !!v || 'La confirmación del password es requerido'
}])
const valid = ref(false)
const showPassword = ref('password')
const showPasswordConfirmation = ref('password')

const user = ref({
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    role: ''
})

const userStore = useUsersStore()
const rolesStore = useRolesStore()

onBeforeMount(async () => {
  await rolesStore.findAll()
})

function togglePassword() {
  if (showPassword.value === 'password') {
    showPassword.value = 'text'
  }
  else {
    showPassword.value = 'password'
  }
}
function togglePasswordConfirmation() {
  if (showPasswordConfirmation.value === 'password') {
    showPasswordConfirmation.value = 'text'
  }
  else {
    showPasswordConfirmation.value = 'password'
  }
}


async function create() {
    if (valid.value === true) {
    loader.value = true
    const res = await userStore.create(user.value)
      console.log(res)
    if (res) {
      await userStore.findAll(1)
      router.push({ name: 'users' })
    }
    else {
      console.log('Error al crear evento')
    }

    loader.value = false
  }
}
</script>