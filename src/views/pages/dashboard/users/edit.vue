<template>
    <v-container>
  
      <loader-component :loader="loader"></loader-component>
      <v-card class="pa-10">
        <v-card-title class="pa-5">
          <h2>Actualizar Usuario Administrador</h2>
        </v-card-title>
        <v-divider class="my-2"></v-divider>
        <v-form v-model="valid" @submit.prevent="create" ref="form">
  
          <!-- {{ title  }} -->
          <v-text-field name="name" label="Nombre" class="mb-2" required :rules="titleRule"
            v-model="user.fullName" variant="outlined">
          </v-text-field>  
  
          <!-- {{ code  }} -->
          <v-text-field  :disabled="isCurrentUser(props.user!)" name="email" label="Email" class="mb-2" required :rules="emailRule"
            v-model="user.email" variant="outlined">
          </v-text-field>

          <!-- {{ modality  }} -->
          <v-text-field v-if="isCurrentUser(props.user!)" name="oldPassword" type="password" label="Password Actual" class="mb-2" required 
            v-model="user.oldPassword" variant="outlined">
          </v-text-field>
  
          <!-- {{ modality  }} -->
          <v-text-field name="password" type="password" label="Nuevo Password" class="mb-2" required 
            v-model="user.password" variant="outlined">
          </v-text-field>

           <!-- {{ modality  }} -->
          <v-text-field name="password_confirmation" type="password" label="Confirmar Password" class="mb-2" required 
            v-model="user.passwordConfirmation" variant="outlined">
          </v-text-field>
            <v-row class="d-flex justify-end">
              <v-btn class="mx-5" @click="() => { userStore.updatePopUp = false }" color="red">Cancelar</v-btn>
              <v-btn type="submit" color="green">Actualizar</v-btn>
            </v-row>
        </v-form>
      </v-card>

      <v-snackbar v-model="snackbar" color="red">
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn color="secondary" variant="text" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  
    </v-container>
  </template>

<script lang="ts" setup>
import { useUsersStore } from '@/stores/base/users';
import LoaderComponent from '@/components/loader.vue'
import { onMounted, ref } from 'vue';
import type { UserIntrface } from '@/interfaces/users.interface';
import { useAuthStore } from '@/stores/auth/auth';

const props = defineProps({user:Object as () => UserIntrface})

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
const snackbar = ref(false)
const snackbarMessage = ref('')


interface updateUser {
    fullName?: string,
    email?: string,
    oldPassword?: string,
    password?: string,
    passwordConfirmation?: string,
}

const user = ref<updateUser>({
    fullName: '',
    email: '',
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
})

onMounted(() => {
  loader.value = true
  setTimeout(() => {
    user.value.fullName = props.user!.fullName
    user.value.email = props.user!.email
    loader.value = false
  }, 1000);
 
})

const userStore = useUsersStore()
const authStore = useAuthStore()



async function create() {
    if (valid.value === true) {
    loader.value = true

    let __user:updateUser = {
      fullName: user.value.fullName,
      email: user.value.email,
      oldPassword: user.value.oldPassword,
      password: user.value.password,
      passwordConfirmation: user.value.passwordConfirmation,
    }

    if(!isCurrentUser(props.user!) || __user.oldPassword == '') delete __user.oldPassword
    if(isCurrentUser(props.user!)) delete __user.email

    if(__user.oldPassword && __user.password==='')
    {
      snackbar.value = true
      snackbarMessage.value = 'El nuevo password es requerido'
      loader.value = false
      return
    }

    if(!__user.oldPassword && isCurrentUser(props.user!)  && __user.passwordConfirmation!= '' && __user.password!='')
    {
      snackbar.value = true
      snackbarMessage.value = 'Debe ingresar el password actual'
      loader.value = false
      return
    }



    if((__user.oldPassword || !isCurrentUser(props.user!)) && __user.password!==__user.passwordConfirmation)
    {
      snackbar.value = true
      snackbarMessage.value = 'El nuevo password no coincide con la confirmación'
      loader.value = false
      return
    }

    if(!__user.oldPassword && __user.password==='')
    {
      delete __user.password
      delete __user.passwordConfirmation
    }

    const res = await userStore.update(props.user!.id, __user)

    if (res) {
      await userStore.findAll(1)
      userStore.updatePopUp = false
    }
    else {
      console.log('Error al crear evento')
    }

    loader.value = false
  }
}

function isCurrentUser(user:UserIntrface){
  return user.id==authStore.user.id
}

</script>