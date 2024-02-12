<template>
<v-overlay class="d-flex justify-center align-center" v-model="props.loader"><v-progress-circular  color="secondary" size="50" width="8" indeterminate></v-progress-circular></v-overlay>
</template>
<script lang="ts" setup>

const props = defineProps({
    loader: Boolean
})


</script>