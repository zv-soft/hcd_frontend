<template>
  <div>
  <v-container>
    <v-row class="mw-400 mt-10 mx-auto d-flex justify-center">

      <v-form @submit.prevent v-model="valid">
        <v-row>
          <v-card color="white" width="500" class="pa-10">

            <h2>Ingresar a Uniandes</h2>
            <v-col cols="12">
              <v-label>Email</v-label>
              <v-text-field :disabled="loader" name="email" label="email" placeholder="admin@example.com2" variant="outlined"
                v-model="user.email"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field :disabled="loader" name="password" label="password" placeholder="Password" variant="outlined" type="password"
                v-model="user.password"></v-text-field>
            </v-col>
            <v-col>
              <v-btn width="100%" color="secondary" @click="login()">
                <v-progress-circular indeterminate v-if="loader" color="white"></v-progress-circular>
                <span v-else>Ingresar</span>
              </v-btn>
            </v-col>
          </v-card>
        </v-row>
      </v-form>
    </v-row>

    <v-snackbar v-model="snackbar" color="red">
      Usuario o contraseña incorrecta
      <template v-slot:actions>
        <v-btn color="secondary" variant="text" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth/auth';
import { useRouter, useRoute } from 'vue-router'

const loader = ref(false)

const auth = useAuthStore()
const router = useRouter()
const valid = ref(false)
const user = ref({ email: '', password: '' })

let snackbar = ref(false)

const isLogged = computed(() => {
  return auth.getUser ? true : false
})




async function login() {
  loader.value = true
  await auth.login(user.value).then(res => {
    console.log(res)
    if (!res){
      snackbar.value = true
    }
    else
      router.replace('/dashboard/home')
  }).catch(err => {
    console.log(err)
    snackbar.value = true
  })

  loader.value = false



}

onMounted(async () => {
  const isLogin = await auth.checkAuthStatus()
  if (isLogin) router.replace('/dashboard/home')

})





</script>
