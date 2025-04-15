<template>
    <div class="d-flex justify-center">
        <!-- <v-row class="d-flex justify-center w-100">
       
            <v-btn color="primary" >Descargar</v-btn>
    
    </v-row> -->

        <!-- <v-row v-if="!receipt"> 
        <v-col cols="12">
        
        </v-col>
    </v-row> -->

        <div v-if="loader" class="d-flex justify-center w-100">
            <Loader :loader="loader" />
        </div>
        <div v-else>

            <NotFoundCard v-if="!receipt" class="mt-10" entidadNombre="Recibo" />

            <v-row v-else class="d-flex justify-center w-100">
                <div class="recibos-container">
                    <v-col class="recibo">
                    <content v-if="receipt" :receipt="receipt" :logo="logo" />
                    </v-col>
                    <v-col v-if="printer === 'true'" class="recibo">
                    <content v-if="receipt" :receipt="receipt" :logo="logo" />
                    </v-col>
                </div>
            </v-row>

  
        </div>


    </div>
</template>

<script lang="ts" setup>
import { EmployeeReceiptInterface, RECEIPT_ITEMS_TYPES, ReceiptDetail } from '@/stores/base/Employee/employee.interface';
import { useEmployeeStore } from '@/stores/base/Employee/employees.store';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import logo from '@/assets/escudo_rdls.png'

import content from './content.vue';

import Loader from '@/components/loader.vue';

import NotFoundCard from '@/components/helpers/notFound.vue';
const employeeStore = useEmployeeStore()

let id = ref(0)
let month = ref('')
let year = ref('')
let receipt = ref({} as EmployeeReceiptInterface)

let loader = ref(false)

const router = useRouter()

const printer = router.currentRoute.value.query.printer


onMounted(async () => {
    const route = useRoute()
    id.value = Number(route.params.id)
    month.value = route.params.month.toString()
    year.value = route.params.year.toString()

    loader.value = true

    receipt.value = await employeeStore.findOneReceiptByID(id.value, month.value, year.value).then(res => {
        console.log(res)
        loader.value = false
        return res
    })

    if (receipt.value && printer && printer === "true") {
    setTimeout(() => {
      window.print();
    }, 500); // Espera para que cargue bien el contenido
  }
})

</script>


<style scoped>

@media print {
  @page {
    size: A4 landscape; /* Fuerza la orientación horizontal */
    margin: 10mm; /* Margen para evitar recortes */
    scale: 0.7; /* Escala para que quepa en la hoja */
  }

  .recibos-container {
    display: flex;
    flex-direction: row; /* Pone los recibos en fila (lado a lado) */
    justify-content: space-between; /* Espaciado uniforme */
    align-items: flex-start;
  }

  .recibo {
    width: 48%; /* Ajusta para que quepan dos en una hoja */
    page-break-inside: avoid; /* Evita cortes en medio de los recibos */
  }
}



</style>
