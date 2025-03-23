<template>

    <loader-component :loader="loader"></loader-component>
    <v-card class="pa-10">
  
  
      <v-card-title>
        <ReturnButton route="/employees" />
        <h2>Detalle del Empleado</h2>
      </v-card-title>
      <loader-component :loader="loader"></loader-component>
  
  
      <v-divider class="my-2"></v-divider>
      <v-form v-model="valid" @submit.prevent="create" :disabled="disabledFrom" ref="form">
  
        <v-row>
          <!-- Full Name -->
          <v-col cols="12" md="6">
            <v-text-field name="name" label="Nombre" class="mb-2" :disabled="disabledFrom" required :rules="validations.titleRule('Nombre')"
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
            <v-text-field name="dob" prepend-inner-icon="mdi-calendar" placeholder="1991/01/01"
              label="Fecha de nacimiento" class="mb-2" required :rules="validations.dobRule()" v-model="employee.dob"
              variant="outlined">
            </v-text-field>
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
            <v-text-field name="startDate" prepend-inner-icon="mdi-calendar" placeholder="1991/01/01"
              label="Fecha de ingreso" class="mb-2" required :rules="validations.dateRule('Fecha de ingreso')"
              v-model="employee.startDate" variant="outlined">
            </v-text-field>
          </v-col>
  
          <!-- Start Date -->
          <v-col cols="12" md="4">
            <v-text-field name="startDateCategory" placeholder="1991/01/01" prepend-inner-icon="mdi-calendar"
              label="Fecha de ingreso en la categoria actual" class="mb-2" required
              :rules="validations.dateRule('Fecha de ingreso en la categoria actual')"
              v-model="employee.startDateCategory" variant="outlined">
            </v-text-field>
          </v-col>
  
  
          <!-- Plants -->
          <v-col cols="12" md="6">
            <v-select v-model="plant" label="Planta" :items="configStore.getAllPlants" item-title="name" item-value="id"
              required outlined variant="outlined"></v-select>
          </v-col>
          <!-- Categories -->
          <v-col cols="12" md="6">
            <v-select v-model="employee.category" label="Categroia" placeholder="Seleccione Categoria" :disabled="!plant || disabledFrom"
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
  
  
        <v-row class="d-flex justify-end my-10">
          <v-btn class="mx-5" v-if="!disabledFrom" @click="()=>{getEmployee(currentEmployee.id)}" color="red">Cancelar</v-btn>
          <v-btn v-if="!disabledFrom" type="submit" color="green">Actualizar</v-btn>
          <v-btn v-if="disabledFrom" @Click="disabledFrom=false" color="primary">Habilitar Edicion</v-btn>
        </v-row>
      </v-form>

      <v-row>
        <v-divider class="my-2"></v-divider>
        <v-btn class="ma-5" variant="outlined" @Click="()=>{familyGroupPopUp=true}" prepend-icon="mdi-human-male-female-child" color="primary">Grupo Familiar</v-btn>
        <v-btn class="ma-5" variant="outlined" @Click="()=>{ordinanceAdjustmentsPopUp=true}" prepend-icon="mdi-draw-pen" color="primary">Ajustes por Ordenanzas</v-btn>
      </v-row>
 
    </v-card>

    <v-dialog persistent v-model="familyGroupPopUp" width="800">
      <FamilyGroup :employee="currentEmployee" @close="familyGroupPopUp=false"></FamilyGroup>
    </v-dialog>

    <v-dialog persistent v-model="ordinanceAdjustmentsPopUp" width="800">
      <ordinanceAdjustments @close="ordinanceAdjustmentsPopUp=false"></ordinanceAdjustments>
    </v-dialog>
  
  
  </template>
  
  <script lang="ts" setup>
  import { useUsersStore } from '@/stores/base/users';
  import LoaderComponent from '@/components/loader.vue'
  import ReturnButton from '@/components/helpers/returnButton.vue'
  import { ref, onBeforeMount, onMounted } from 'vue';

  import FamilyGroup from './modals/familyGroup.vue'
  import ordinanceAdjustments from './modals/ordinanceAdjustments.vue';
  
  import *  as validations from './helpers/validations';
  
  import { useRouter } from 'vue-router';
  import { newEmployee } from './helpers/create';
  import { useConfigStore } from '@/stores/base/Configurations/configurations.store';
  import { useEmployeeStore } from '@/stores/base/Employee/employees.store';
  import { EmployeeInterface, EmployeesInterface } from '@/stores/base/Employee/employee.interface';
  
  const router = useRouter()
  
  const loader = ref(false)
  
  const valid = ref(false)

  const disabledFrom = ref(true)
  
  const plant = ref()

  const familyGroupPopUp = ref(false)
  const ordinanceAdjustmentsPopUp = ref(false)

  const currentEmployee = ref({} as EmployeeInterface)
  
  const employee = newEmployee
  
  const userStore = useUsersStore()
  const configStore = useConfigStore()
  
  const employeeStore = useEmployeeStore()

  onMounted(async () => {

    if(router.currentRoute.value.params.id && router.currentRoute.value.params.id != undefined){
    await getEmployee(Number(router.currentRoute.value.params.id)) 
    }

    })
  
  
  onBeforeMount(async () => {
    await configStore.findAllPlant()
    await configStore.findAllStudies()
  })

  async function getEmployee(__id:number){
    disabledFrom.value=true
    loader.value=true
    const employee = await employeeStore.findOne(__id)

    employeeStore.employee = employee

    setValues(employee)
  }

  function setValues(__employee: EmployeeInterface){

    currentEmployee.value = __employee

    plant.value = __employee.category.plant.id,



    setTimeout(() => {
        employee.value = {
        ...__employee,
        category: __employee.category.id,
        studies: __employee.studies.id,
        seniority: __employee.seniority.toString(),
        basicSalary: 150.00.toFixed(2),
        cbu: __employee.cbu,
    }
    }, 1000);

    loader.value=false

  }
  
  async function create() {
    console.log(employee.value)
    if (valid.value === true) {
      loader.value = true

      const { familyGroups, ordinanceAdjustments, id, ...employeeToUpdate } = employee.value
      const res = await employeeStore.update(id, employeeToUpdate)
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