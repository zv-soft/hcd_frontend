<template>
    <router-link :to="_route">
        <v-btn class="my-5" icon="mdi-arrow-left-bold" color="secondary"></v-btn>
    </router-link>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    const props = defineProps({route: String})
    const _route = ref('/dashboard')
    if(props.route) _route.value = props.route!
</script>