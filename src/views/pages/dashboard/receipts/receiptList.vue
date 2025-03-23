<template>
  <div>
    <loader-component :loader="loader"></loader-component>
    <v-card class="pa-10">
      <h1>Recibos de sueldo</h1>
    </v-card>

    <v-card class="pa-10 mt-5">
      <h2>Buscar un recibo por empleado</h2>
      <v-form>
        <v-row class="w-100 mt-10">
          <v-col cols="12" md="4" class="d-flex justify-center">
            <v-select
              label="Empleado"
              variant="outlined"
              density="compact"
              prepend-icon="mdi-user"
              item-title="name"
              item-value="employeeRecord"
              v-model="employeeId"
              :items="employeesList" >
              </v-select>
          </v-col>
          <v-col>
            <v-select
              v-model="monthForView"
              :items="months"
              item-title="text"
              item-value="value"
              label="Mes"
              variant="outlined"
              prepend-icon="mdi-calendar"
            ></v-select>
          </v-col>
          <v-col>
            <v-combobox
              v-model="yearForView"
              :items="lastYears()"
              label="Año"
              variant="outlined"
            ></v-combobox>
          </v-col>
          <v-col cols="12" md="3" class="d-flex justify-center">
            <v-btn color="primary" @click="()=>{viewReceipt(employeeId, monthForView, yearForView)}">Ver Recibo</v-btn>
            <v-btn class="mx-2" color="primary" @click="()=>{viewReceipt(employeeId, monthForView, yearForView, true)}"><v-icon>mdi-printer</v-icon></v-btn>
          </v-col>
        </v-row>
       
      </v-form>
    </v-card>

    <v-card class="mt-5 pa-10">
      <v-form>
        <v-row>
          <v-col cols="12" md="3">
            <v-select
              v-model="month"
              :items="months"
              item-title="text"
              item-value="value"
              label="Mes"
              variant="outlined"
              prepend-icon="mdi-calendar"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-combobox
              v-model="year"
              :items="years()"
              label="Año"
              variant="outlined"
            ></v-combobox>
          </v-col>
          <v-col cols="12" md="6">
            <v-file-input
              v-model="file"
              accept=".xlsx, .xls"
              label="Seleccione un archivo"
              variant="outlined"
              prepend-icon="mdi-file"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-end">
       
            <v-btn color="primary" @click="uploadReceipts()">Cargar Recibos</v-btn>
          
        </v-row>
        
      </v-form>
    </v-card>


    <v-card class="mt-5 pa-10">
      <v-data-table
        :headers="headers"
        :items="employeeStore.receiptList"
        class="elevation-1"
      >
    
        <template v-slot:item.actions="{ item }">
          <v-btn class="mx-1" color="primary" @click="()=>{viewReceipt(item.employeeRecord, item.month, item.year, false)}">Ver</v-btn>
          <v-btn class="mx-1" color="primary" @click="()=>{viewReceipt(item.employeeRecord, item.month, item.year,true)}"><v-icon>mdi-printer</v-icon></v-btn>
        </template>
    
    </v-data-table>
    </v-card>
  </div>
</template>

<script setup lang="ts">

//Importations
import { ref, onBeforeMount } from 'vue'
import loaderComponent from '@/components/loader.vue'

import { useEmployeeStore } from '@/stores/base/Employee/employees.store'
import { EmployeeInterface, EmployeesWithPaginationInterface, ReceiptListInterface } from '@/stores/base/Employee/employee.interface';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

//Variables
let loader = ref(false)
const file = ref<File | null>(null);
const month = ref('')
const year = ref('')
const employeeStore = useEmployeeStore()
const employeesList = ref([] as EmployeeInterface[])

const receiptsList = ref([] as ReceiptListInterface[])

const headers = [
  { title: 'Nombre', key: 'fullName', sortable: true },
  { title: 'Legajo', key: 'employeeRecord', sortable: true },
  { title: 'Basico', key: 'basicSalary', sortable: false },
  { title: 'Total', key: 'totalSalary', sortable: false },
  { title: 'Periodo', key:'period',  value: item => createPeriod(item.month, item.year), sortable: true },
  { title: 'Acciones', value: 'actions', sortable: false },
]

const employeeId = ref(null)
const monthForView = ref(null)
const yearForView = ref(null)

let months = [
  { value: 1, text: 'Enero' },
  { value: 2, text: 'Febrero' },
  { value: 3, text: 'Marzo' },
  { value: 4, text: 'Abril' },
  { value: 5, text: 'Mayo' },
  { value: 6, text: 'Junio' },
  { value: 7, text: 'Julio' },
  { value: 8, text: 'Agosto' },
  { value: 9, text: 'Septiembre' },
  { value: 10, text: 'Octubre' },
  { value: 11, text: 'Noviembre' },
  { value: 12, text: 'Diciembre' }
]

const createPeriod = (month:number, year:number) => {
  const monthName = months.find(item => item.value === month).text
  return `${monthName}/${year}`
}


const years = () => {
  let currentYear = new Date().getFullYear()
  let years = []
  for (let i = 0; i < 10; i++) {
    years.push(currentYear + i)
  }
  return years
}

const lastYears = () => {
  let currentYear = new Date().getFullYear()
  let years = []

  let endYear = 2000

  while (currentYear >= endYear) {
    years.push(currentYear)
    currentYear--
  }
  return years
}

const clearForm = ()=>{
  file.value = null
  month.value = null
  year.value = null
}




onBeforeMount(async () => {
    const hasEmployees = await employeeStore.findAll()

    const receipts = await employeeStore.getReceiptsList()

    
    if(receipts){
      receiptsList.value = employeeStore.receiptList
    }
    if(hasEmployees){
      employeesList.value = employeeStore.employeesList
    }
})


const uploadReceipts = async () => {

  loader.value = true
  try {
    const formData = new FormData()

    // Verificar si el archivo está seleccionado
    if (!file.value) {
      console.error('Por favor, seleccione un archivo antes de cargar.')
      return
    }

    console.log(file.value)

    formData.append('file', file.value[0])
    formData.append('month', month.value)
    formData.append('year', year.value)

    const response = await employeeStore.uploadReceipts(formData)



    clearForm()
  } catch (error) {
    console.log(error)
  } finally {
    loader.value = false
  }

  console.log('Uploading receipts')
}

const viewReceipt = async (record:number, month:number, year:number, print:boolean=false) => {


// Obtiene la URL actual
const nuevaURL = router.resolve({
    path: route.path.replace(/\d+$/, '456') // Cambia el ID en la URL
  }).href;

  window.open(`${nuevaURL}/${record}/${month}/${year}?printer=${print}`, '_blank');
}


</script>
