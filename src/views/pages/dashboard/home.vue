<template>
  <div>

  <v-card class="pa-10"> <h1>Bienvenido {{ user.fullName }}</h1></v-card>
  <!-- <Dashboard class="pa-10"/> -->

  </div>


</template>
<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth/auth';

const auth = useAuthStore()

const user = auth.getUser

auth.checkAuthStatus()

</script>