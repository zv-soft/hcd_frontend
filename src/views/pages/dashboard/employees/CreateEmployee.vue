<template>

  <loader-component :loader="loader"></loader-component>
  <v-card class="pa-10">


    <v-card-title>
      <ReturnButton route="/employees" />
      <h2>Crear nuevo Empleado</h2>
    </v-card-title>
    <loader-component :loader="loader"></loader-component>


    <v-divider class="my-2"></v-divider>
    <v-form v-model="valid" @submit.prevent="create" ref="form">

      <v-row>
        <!-- Full Name -->
        <v-col cols="12" md="6">
          <v-text-field name="name" label="Nombre" class="mb-2" required :rules="validations.titleRule('Nombre')"
            v-model="employee.name" variant="outlined">
          </v-text-field>
        </v-col>

        <!-- Last Name -->
        <v-col cols="12" md="6">
          <v-text-field name="lastname" label="Apellido" class="mb-2" required
            :rules="validations.titleRule('Apellido')" v-model="employee.lastName" variant="outlined">
          </v-text-field>
        </v-col>

        <!-- Address -->
        <v-col cols="12">
          <v-text-field name="address" prepend-inner-icon="mdi-home-city" label="Domicilio" class="mb-2" required
            :rules="validations.titleRule('Domicilio')" v-model="employee.address" variant="outlined">
          </v-text-field>
        </v-col>

        <!-- DNI -->
        <v-col cols="12" md="4">
          <v-text-field name="dni" label="DNI" class="mb-2" prepend-inner-icon="mdi-card-account-details" required :rules="validations.requiredNumberRule('DNI', 7)"
            v-model="employee.dni" variant="outlined">
          </v-text-field>
        </v-col>

        <!-- CUIL -->
        <v-col cols="12" md="4">
          <v-text-field name="cuil" label="CUIL" class="mb-2" prepend-inner-icon="mdi-card-account-details" required
            :rules="validations.requiredNumberRule('CUIL', 10)" v-model="employee.cuil" variant="outlined">
          </v-text-field>
        </v-col>

        <!-- Phone number -->
        <v-col cols="12" md="4">
          <v-text-field name="phoneNumber" label="Celular" class="mb-2" prepend-inner-icon="mdi-cellphone" required
            :rules="validations.requiredNumberRule('Celular', 10)" v-model="employee.phoneNumber" variant="outlined">
          </v-text-field>
        </v-col>

        <!-- Email -->
        <v-col cols="12" md="6">
          <v-text-field name="email" prepend-inner-icon="mdi-email" label="Email" class="mb-2" required :rules="validations.emailRule()"
            v-model="employee.email" variant="outlined">
          </v-text-field>
        </v-col>



        <!-- DOB -->
        <v-col cols="12" md="6">
          <DatePicker
            name="dob"
            label="Fecha de nacimiento"
            :required="true"
            :rules="validations.dobRule()"
            v-model="employee.dob"
          />
        </v-col>


        <!-- Legajo -->
        <v-col cols="12" md="4">
          <v-text-field name="employeeRecord" label="Legajo" class="mb-2" required
            :rules="validations.requiredNumberRule('Legajo', 4)" v-model="employee.employeeRecord" variant="outlined">
          </v-text-field>
        </v-col>

        <!-- Function -->
        <v-col cols="12" md="4">
          <v-text-field name="function" label="Función" class="mb-2" required :rules="validations.titleRule('Función')"
            v-model="employee.functionEmployee" variant="outlined">
          </v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select v-model="employee.studies" label="Estudios" :items="configStore.getAllStudies" item-title="name"
            item-value="id" required outlined variant="outlined"></v-select>
        </v-col>

        <!-- Antiguedad -->
        <v-col cols="12" md="4">
          <v-text-field name="sniority" label="Acarreo de antiguedad" class="mb-2" required
            :rules="validations.requiredNumberRule('Acarreo de antiguedad', 1)" v-model="employee.seniority"
            variant="outlined">
          </v-text-field>
        </v-col>

        <!-- Start Date -->
        <v-col cols="12" md="4">
          <DatePicker
            name="startDate"
            label="Fecha de ingreso"
            :required="true"
            :rules="validations.dateRule('Fecha de ingreso')"
            v-model="employee.startDate"
          />
        </v-col>

        <!-- Start Date Category -->
        <v-col cols="12" md="4">
          <DatePicker
            name="startDateCategory"
            label="Fecha de ingreso en la categoria actual"
            :required="true"
            :rules="validations.dateRule('Fecha de ingreso en la categoria actual')"
            v-model="employee.startDateCategory"
          />
        </v-col>


        <!-- Plants -->
        <v-col cols="12" md="6">
          <v-select v-model="plant" label="Planta" :items="configStore.getAllPlants" item-title="name" item-value="id"
            required outlined variant="outlined"></v-select>
        </v-col>
        <!-- Categories -->
        <v-col cols="12" md="6">
          <v-select v-model="employee.category" label="Categroia" placeholder="Seleccione Categoria" :disabled="!plant"
            :items="plant ? configStore.getAllPlants.find(p => p.id==plant).category : []" item-title="name" item-value="id" required
            outlined variant="outlined"></v-select>
        </v-col>


        <v-col cols="12" md="6">
          <v-row class="d-flex justify-center">
            <v-checkbox v-model="employee.mudon" color="primary" label="Cuota Mu.Do.N" class="mx-2"
              required></v-checkbox>
            <v-checkbox v-model="employee.upcn" color="primary" label="Cuota UPCN" class="mx-2" required></v-checkbox>
            <v-checkbox v-model="employee.muoem" color="primary" label="Cuota M.U.O.E.M." class="mx-2"
              required></v-checkbox>
          </v-row>

        </v-col>
        <v-col cols="12" md="6">
          <v-row class="d-flex justify-center">
            <v-checkbox v-model="employee.politicalContribution" color="primary" label="Aporte Politica" class="mx-2"
              required></v-checkbox>
            <v-checkbox v-model="employee.affiliationUoem" color="primary" label="Afiliacion U.O.E.M." class="mx-2"
              required></v-checkbox>
            <v-checkbox v-model="employee.remunerative" color="primary" label="Retrivutivos" class="mx-2"
              required></v-checkbox>
          </v-row>

        </v-col>

        <!-- basicSalary -->
        <v-col cols="12" md="2">
          <v-text-field prepend-inner-icon="mdi-currency-usd" name="basicSalary" label="Basico" class="mb-2" required
            :rules="validations.requiredNumberRule('Basico', 1)" v-model="employee.basicSalary" variant="outlined">
          </v-text-field>
        </v-col>

        <!-- Bank -->
        <v-col cols="12" md="4">
          <v-text-field prepend-inner-icon="mdi-bank" name="bank" label="Banco" class="mb-2" required
            :rules="validations.titleRule('Banco')" v-model="employee.bank" variant="outlined">
          </v-text-field>
        </v-col>

        <!-- Bank -->
        <v-col cols="12" md="6">
          <v-text-field name="cbu" label="CBU" class="mb-2" required :rules="validations.requiredNumberRule('CBU', 22)"
            v-model="employee.cbu" variant="outlined">
          </v-text-field>
        </v-col>




      </v-row>


      <v-row class="d-flex justify-end">
        <router-link to="/employees">
          <v-btn class="mx-5"  color="red">Cancelar</v-btn>
        </router-link>
        
        <v-btn type="submit" color="green">Crear</v-btn>
      </v-row>
    </v-form>


  </v-card>


</template>

<script lang="ts" setup>
import { useUsersStore } from '@/stores/base/users';
import LoaderComponent from '@/components/loader.vue'
import ReturnButton from '@/components/helpers/returnButton.vue'
import DatePicker from '@/components/DatePicker.vue'
import { ref, onBeforeMount } from 'vue';

import *  as validations from './helpers/validations';

import { useRouter } from 'vue-router';
import { newEmployee } from './helpers/create';
import { useConfigStore } from '@/stores/base/Configurations/configurations.store';
import { useEmployeeStore } from '@/stores/base/Employee/employees.store';

const router = useRouter()

const loader = ref(false)

const valid = ref(false)

const menu = ref(false)

const startDate = ref()

const plant = ref()

const employee = newEmployee

const userStore = useUsersStore()
const configStore = useConfigStore()

const employeeStore = useEmployeeStore()


onBeforeMount(async () => {
  await configStore.findAllPlant()
  await configStore.findAllStudies()
  cleanForm()
})

const cleanForm = () => {
  newEmployee.value.name = null
  newEmployee.value.lastName = null
  newEmployee.value.address = null
  newEmployee.value.dni = null
  newEmployee.value.cuil = null
  newEmployee.value.phoneNumber = null
  newEmployee.value.email = null
  newEmployee.value.dob = null
  newEmployee.value.employeeRecord = null
  newEmployee.value.functionEmployee = null
  newEmployee.value.studies = 0
  newEmployee.value.seniority = null
  newEmployee.value.startDate = null
  newEmployee.value.startDateCategory = null
  newEmployee.value.category = 0
  newEmployee.value.mudon = false
  newEmployee.value.upcn = false
  newEmployee.value.muoem = false
  newEmployee.value.politicalContribution = false
  newEmployee.value.affiliationUoem = false
  newEmployee.value.remunerative = false
  newEmployee.value.basicSalary = null
  newEmployee.value.bank = null
  newEmployee.value.cbu = null
}

async function create() {
  console.log(employee.value)
  if (valid.value === true) {
    loader.value = true

    const {id, familyGroups, ordinanceAdjustments, ...rest} = employee.value

    const res = await employeeStore.create(rest)
    console.log(res)
    if (res) {
      await userStore.findAll(1)
      router.push({ name: 'employees' })
    }
    else {
      console.log('Error al empleado')
    }

    loader.value = false
  }
}
</script>