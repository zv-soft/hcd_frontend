<template>
  <div>
    <Header />
    <Sidebar />
    <v-main class="pa-10">
    
        <router-view :style="{ overflow: 'hidden' }">
        </router-view>

    </v-main>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '../components/sidebar/Sidebar.vue'
import Header from '../components/header/Header.vue'


// export default defineComponent({
//   name: 'HomeView',

//   components: {
//     Sidebar,
//     Header
//   },
//   data() {
//     return {
//       drawer: true
//     }
//   },
// });
</script>