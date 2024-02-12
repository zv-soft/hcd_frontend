<template>
  <div>
     <v-app-bar color="primary">
      <v-app-bar-nav-icon v-if="$vuetify.display.xs || $vuetify.display.sm || $vuetify.display.md" variant="text" @Click="settingsStore.drawerChange()"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <Profile/>
    </v-app-bar>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '@/stores/base/settings';
import Profile from "./Profile.vue";
const settingsStore = useSettingsStore()
</script>