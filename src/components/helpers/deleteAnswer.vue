<template>
   <v-dialog v-model="deleteDialogStore.openModal" width="500">
    <v-card class="pa-10">
        <v-row class="d-flex justify-end">
            <v-icon color="red" size="40">mdi-trash-can</v-icon>
        </v-row>

        <h3>Seguro desea elminiar {{ deleteDialogStore.value }}</h3>

    <v-row   class="d-flex justify-end mt-10">
        <v-btn class="ma-1" color="green" @click="deleteDialogStore.openModal = false">Cancelar</v-btn>
        <v-btn class="ma-1" color="red" @click="deleteAndClose"> <v-icon color="white" >mdi-trash-can</v-icon>Eliminar</v-btn>
    </v-row>   
    </v-card>
   </v-dialog>
</template>

<script lang="ts" setup>
import { useDeleteDialog } from '@/stores/helpers/deleteDialog';

const emit = defineEmits(['delete'])

const deleteAndClose = () => {
    emit('delete')
    deleteDialogStore.openModal = false
}

const deleteDialogStore = useDeleteDialog()
</script>
