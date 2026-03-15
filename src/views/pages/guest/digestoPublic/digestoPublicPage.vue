<template>

<div>
<v-container>
    <v-row>
        
        <v-col cols="12" class="text-center">
            <v-card color="primary" class="pa-3 ma-2">
                <h1>Digesto HCD Rincon de los Sauces</h1>
            </v-card>
        </v-col>
        
    </v-row>



    <DigestoPublic :isPublic="true" />
</v-container>


</div>

</template>

<script lang="ts" setup>

import DigestoPublic from '@/views/pages/dashboard/digesto/digestoPage.vue'


</script>
