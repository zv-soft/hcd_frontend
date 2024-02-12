<template>
  <div>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" color="primary" class="mr-10" icon>
          <v-avatar size="48"> <img width="48" :src="profile.getAvatarUrl(auth.$state.user.fullName)" alt="Profile Image" /></v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item :title="null" v-for="(item, index) in items" :key="index" :value="index">
          <template v-slot:prepend>
          <v-icon :icon="item.icon" ></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>

        <v-list-item :title="null" @click="logout()">
          <template v-slot:prepend>
          <v-icon icon="mdi-logout" ></v-icon>
          </template>
          <v-list-item-title>Cerrar Sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </div>
</template>


<script lang="ts" setup>

import { useProfileStore } from "../../stores/base/profile";
import { useAuthStore } from "../../stores/auth/auth";
import { useRouter } from 'vue-router'

const profile = useProfileStore()
const auth = useAuthStore()
const router = useRouter()

interface items {
  title:string,
  icon:string
}

const image_profile = ' '
const items:Array<items> = []

async function logout(){
  await auth.logout()
  router.replace('/auth/login')
}
</script>