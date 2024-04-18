<template>


    <v-card class="pa-10">
        <v-row>
            <h1>Ajustes por Ordenanzas</h1>

        </v-row>

        <v-row class="d-flex justify-end my-3">
            <v-btn icon="mdi-plus" @Click="newOrdinanceAdjustmentModal = true" color="primary"></v-btn>
        </v-row>

        <v-dialog v-model="newOrdinanceAdjustmentModal" width="500">
            <v-card class="pa-5">
                <v-form @submit.prevent="create" v-model="valid">
                    <v-col cols="12">
                        <v-text-field name="name" label="Nombre" density="compact" required
                            v-model="newOrdinanceAdjustment.name" :rules="validations.titleRule('Nombre')"
                            variant="outlined">
                        </v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field name="amount" label="Monto" density="compact"
                            prepend-inner-icon="mdi-currency-usd" required v-model="newOrdinanceAdjustment.amount"
                            :rules="validations.requiredNumberRule('Monto', 1)" variant="outlined">
                        </v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-select v-model="newOrdinanceAdjustment.action" label="Select" :items="actions"
                            item-title="value" item-value="key" :rules="validations.titleRule('Relacion')"
                            density="compact" variant="outlined"></v-select>
                    </v-col>
                    <v-row class="d-flex justify-end">
                        <v-btn class="mx-5" @click="newOrdinanceAdjustmentModal = false" color="red">Cancelar</v-btn>
                        <v-btn type="submit" color="green">Crear</v-btn>
                    </v-row>
                </v-form>
            </v-card>
        </v-dialog>

        <v-data-table :headers="headers" :items="employeeStore.employee.ordinanceAdjustments">
            <template v-slot:item.actions="{ item }">
                <!-- <v-btn icon density="compact" color="green-lighten-1" class="mr-2"><v-icon
                            size="15">mdi-pen</v-icon></v-btn> -->
                <v-btn icon density="compact" color="red-lighten-1"
                    @Click="() => { deleteDialogStore.openDialog(item.id, 'Ajuste por Ordenanza') }"><v-icon
                        size="15">mdi-trash-can</v-icon></v-btn>
            </template>

        </v-data-table>

        <v-row class="d-flex justify-end">
            <v-btn class="mx-5" @click="closeModal" color="red">Cerrar</v-btn>
        </v-row>

        <DeleteDialog @delete="employeeStore.removeAdjustment(deleteDialogStore.idToDelete)"></DeleteDialog>


    </v-card>



</template>

<script lang="ts" setup>
import { ref } from 'vue';
import *  as validations from '../helpers/validations';
import DeleteDialog from '@/components/helpers/deleteAnswer.vue'
import { useEmployeeStore } from '@/stores/base/Employee/employees.store';
import { useDeleteDialog } from '@/stores/helpers/deleteDialog';

const newOrdinanceAdjustmentModal = ref(false)
const emit = defineEmits(['close'])
const valid = ref(false)
const employeeStore = useEmployeeStore()
const deleteDialogStore = useDeleteDialog()

const actions = [
    { key: 'increase', value: 'Agregar' },
    { key: 'decrease', value: 'Restar' }
]

const headers = [
    { title: 'Nombre', key: 'name' },
    { title: 'Monto', key: 'amount' },
    { title: 'Tipo', key: 'action', value: (item: any) => item.action === 'increase' ? 'Agregar' : 'Restar' },
    { title: 'Acciones', key: 'actions' },
]

const newOrdinanceAdjustment = ref({
    name: '',
    amount: '',
    action: ''
})

const closeModal = () => {
    emit('close')
}

const create = async () => {
    if (valid.value === true) {

        const response = await employeeStore.createAdjustment(employeeStore.employee.id, newOrdinanceAdjustment.value)
        if (response) {
            newOrdinanceAdjustmentModal.value = false
            cleanForm()
        }
        newOrdinanceAdjustmentModal.value = false
    }
}

const cleanForm = () => {
    newOrdinanceAdjustment.value = {
        name: '',
        amount: '',
        action: ''
    }
}




</script>