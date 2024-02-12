<template>
  <v-app>
    <v-main class="background-container">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth/auth';



const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuthStatus()
})


</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300&family=Work+Sans:wght@200;300;400;500&display=swap');

.background-container {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/background.svg"); /* Ruta relativa al archivo SVG */
  background-repeat: repeat;
}
body {
  font-family: 'Nunito', sans-serif !important;
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'Work Sans', sans-serif !important;
}
</style>
