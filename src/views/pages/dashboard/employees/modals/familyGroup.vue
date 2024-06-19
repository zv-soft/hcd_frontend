<template>
    <v-card class="pa-10">

        <v-row>
            <h1>Grupo Familiar</h1>

        </v-row>

        <v-row class="d-flex justify-end my-3">
            <v-btn icon="mdi-plus" @click="newFamilyPeople = true" color="primary"></v-btn>
        </v-row>

        <v-dialog v-model="newFamilyPeople" width="800">
            <v-card class="pa-10">

                <v-form v-model="valid" @submit.prevent="create" ref="form">

                    <v-row>

                        <v-col cols="12">
                            <v-select v-model="newFamily.relationship" label="Select" :items="relationship"
                                item-title="value" item-value="key" :rules="validations.titleRule('Relacion')"
                                density="compact" variant="outlined"></v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field name="name" label="Nombre" density="compact" required v-model="newFamily.name"
                                :rules="validations.titleRule('Nombre')" variant="outlined">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field name="lastName" label="Apellido" density="compact" required
                                v-model="newFamily.lastName" :rules="validations.titleRule('Apellido')"
                                variant="outlined">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field name="dob" prepend-inner-icon="mdi-calendar" placeholder="1991-01-01"
                                label="Fecha de nacimiento" density="compact" required :rules="validations.dobRule()"
                                v-model="newFamily.dob" variant="outlined">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field name="dni" label="DNI" density="compact"
                                prepend-inner-icon="mdi-card-account-details" required
                                :rules="validations.requiredNumberRule('DNI', 7)" v-model="newFamily.dni"
                                variant="outlined">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-select v-if="newFamily.relationship != 'spouse'" v-model="newFamily.scholarships"
                                label="Select" :items="scholarships" item-title="value" item-value="key"
                                :rules="validations.titleRule('Relacion')" density="compact"
                                variant="outlined"></v-select>
                        </v-col>

                        <v-col cols="6">
                            <v-row>
                                <v-checkbox v-model="newFamily.disability" color="primary" label="Discapacidad"
                                    class="mx-2" required></v-checkbox>
                                <v-checkbox v-model="newFamily.underLegalCustody" color="primary"
                                    label="Bajo guarda legal" class="mx-2" required></v-checkbox>
                            </v-row>
                        </v-col>
                    </v-row>


                    <v-row class="d-flex justify-end">
                        <v-btn 
                            class="mx-5" 
                            @click="cleanForm" 
                            color="red">Cancelar</v-btn>
                        <v-btn type="submit" color="green">
                            <span v-if="toEdit">Actualizar</span>
                            <span v-else>Crear</span>
                        </v-btn>
                    </v-row>
                </v-form>

            </v-card>
        </v-dialog>


        <v-data-table class="my-5" :headers="headers" :items="employeeStore.employee.familyGroups">


            <template v-slot:item.actions="{ item }">
                <v-btn 
                    @click="editFamily(item)"
                    icon 
                    density="compact" 
                    color="green-lighten-1" 
                    class="mr-2">
                    <v-icon
                        size="15">
                        mdi-pen
                    </v-icon>
                </v-btn>
                <v-btn icon density="compact" color="red-lighten-1"
                    @Click="() => { deleteDialogStore.openDialog(item.id, 'Familiar') }"><v-icon
                        size="15">mdi-trash-can</v-icon></v-btn>
            </template>

            <template v-slot:item.disability="{ item }">

                <v-chip v-if="item.disability" size="x-small" color="green">Discapacidad</v-chip>

                <v-chip v-if="item.underLegalCustody" size="x-small" color="green">Guarda Legal</v-chip>

            </template>



        </v-data-table>
        <v-row class="d-flex justify-end">
            <v-btn class="mx-5" @click="closeModal" color="red">Cerrar</v-btn>
        </v-row>

        <DeleteDialog @delete="employeeStore.removeFamily(deleteDialogStore.idToDelete)"></DeleteDialog>

    </v-card>


</template>

<script lang="ts" setup>

import { ref } from 'vue';
import *  as validations from '../helpers/validations';
import { scholarshipsList } from '@/interfaces/scholarship';
import { relationshipsList } from '@/interfaces/relationship';
import { useEmployeeStore } from '@/stores/base/Employee/employees.store';
import DeleteDialog from '@/components/helpers/deleteAnswer.vue';
import { useDeleteDialog } from '@/stores/helpers/deleteDialog';

const employeeStore = useEmployeeStore()
const deleteDialogStore = useDeleteDialog()

const newFamily = ref({
    id: 0,
    name: '',
    lastName: '',
    relationship: null,
    dob: '',
    dni: '',
    scholarships: null,
    disability: false,
    underLegalCustody: false,
    employeeId: employeeStore.employee.id
})

const toEdit = ref(false)

const headers = [
    {
        title: 'Nombre',
        key: 'fullName',
        value: item => `${item.name} ${item.lastName}`,
    },
    {
        title: 'Relacion',
        key: 'relationship',
        value: item => `${relationshipsList.find(relationship => relationship.key === item.relationship)?.value}`
    },
    { title: 'Fecha de nacimiento', key: 'dob' },
    { title: 'DNI', key: 'dni' },
    { title: 'Condiciones', key: 'disability' },
    { title: 'Acciones', key: 'actions' },
]

// const props = defineProps({ employee: Object as () => EmployeeInterface })
const emit = defineEmits()
// const employee = ref(props.employee)
const valid = ref(false)
const newFamilyPeople = ref(false)

const scholarships = scholarshipsList
const relationship = relationshipsList

const closeModal = () => {
    emit('close')
}

const editFamily = (data)=>{
    newFamily.value = data
    newFamily.value.employeeId = employeeStore.employee.id

    toEdit.value = true
    newFamilyPeople.value = true
}
const cleanForm = () => {
    newFamilyPeople.value = false,
    newFamily.value = {
        id: 0,
        name: '',
        lastName: '',
        relationship: null,
        dob: '',
        dni: '',
        scholarships: null,
        disability: false,
        underLegalCustody: false,
        employeeId: employeeStore.employee.id
    }
}


const create = async () => {
    if (newFamily.value.relationship == 'spouse') {
        delete newFamily.value.scholarships
    }

    if (valid.value === true) {
        let response = null
        if(toEdit.value)
        {
            
            const {id, ...data } = newFamily.value
          
            response = await employeeStore.updateFamily(id, data)
        }
        else
        {
            delete newFamily.value.id
            response = await employeeStore.createFamily(employeeStore.employee.id, newFamily.value)
        }
        
        if (response) {
            newFamilyPeople.value = false
            cleanForm()
        }

    }
}

</script>
