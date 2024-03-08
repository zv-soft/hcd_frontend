<template>
  <div>
    <v-navigation-drawer  expand-on-hover
        :rail="($vuetify.display.mdAndDown )?false:true"   v-model="settings.drawer" :width="250">
      <v-list> <v-list-item :title="null" v-for="(item, i) in items" :key="i" :value="item" :to="item.path" color="secondary">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>       
    </v-navigation-drawer>
  </div>
</template>
<script lang="ts" setup>
import { useSettingsStore } from "../../stores/base/settings";

const settings = useSettingsStore()

const items = [
{
    title: 'Inicio',
    value: 'home',
    path: '/dashboard/home',
    icon: 'mdi-home'
  },
  {
    title: 'Usuarios',
    value: 'users',
    path: '/users',
    icon: 'mdi-account-group'
  },
  {
    title: 'Empleados',
    value: 'employees',
    path: '/employees',
    icon: 'mdi-badge-account'
  },
  // {
  //   title: 'Perfiles Profesionales',
  //   value: 'professionalProfile',
  //   path: '/professionalProfile',
  //   icon: 'mdi-format-list-text'
  // },
  // {
  //   title: 'Programas',
  //   value: 'programs',
  //   path: '/programs',
  //   icon: 'mdi-alpha-p-box-outline'
  // },
  // {
  //   title: 'Configuraciones',
  //   value: 'configurations',
  //   path: '/configurations',
  //   icon: 'mdi-cogs'
  // },

]
</script>