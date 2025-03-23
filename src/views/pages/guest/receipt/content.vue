<template>


  <div>
    <v-card max-width="600px" class="pa-3 elevation-0">

      <header>
        <v-row>
          <v-col class="mx-1">
            <img :src="logo" alt="logo" height="60">
          </v-col>
          <v-col cols="7" class="py-0">
            <h4 class="text-start title_text mb-2 mt-1">HONORABLE CONCEJO DELIBERANTE</h4>
            <p class="header-subtitle text-start title_text">AV. GRAL. MOSCONI Nº 183 - RINCON DE LOS SAUCES</p>
            <p class="header-subtitle text-start title_text">PROVINCIA DE NEUQUEN</p>
            <p class="header-subtitle text-start title_text">CUIT: 33-70971335-9</p>
            <p class="header-subtitle text-start title_text">Municipalidad de Rincon de los Sauces</p>
            <p class="header-subtitle text-start title_text">CUIT: 30-99927622-5</p>
          </v-col>
          <v-col cols="3">
            <p class="header-date text-center font-weight-black">PERIODO: {{ receipt.period }}</p>
            <p class="header-date text-center font-weight-black">FECHA DE PAGO: 3/9/2024</p>
          </v-col>

          <v-divider></v-divider>
          <v-col cols="12" class="pa-0">
            <h4 class="title_text" style="text-align: center;">RECIBO DE REMUNERACIONES</h4>
          </v-col>

        </v-row>

      </header>
      <section class="empleado">
        <table>
          <thead>
            <tr>
              <th class="title_text text-center">APELLIDO Y NOMBRE</th>
              <th class="title_text text-center">N LEGAJO</th>
              <th class="title_text text-center">CUIL</th>
              <th class="title_text text-center">REM.BASICA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="title_text text-center">{{ receipt?.employee?.fullName }}</td>
              <td class="title_text text-center">{{ receipt?.legajo }}</td>
              <td class="title_text text-center">{{ receipt?.employee?.cuit }}</td>
              <td class="title_text text-center"> ${{ receipt?.basicSalary }}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th class="title_text text-center">CALIFICACION PROFESIONAL</th>
              <th class="title_text text-center">FECHA DE INGRESO</th>
              <th class="title_text text-center">CATEGORIA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="title_text text-center">{{ receipt?.employee?.employeeFunction }}</td>
              <td class="title_text text-center">{{ receipt?.employee?.startDate }}</td>
              <td class="title_text text-center">{{ receipt?.employee?.category }}</td>
            </tr>
          </tbody>
        </table>

      </section>

      <section class="conceptos">
        <table class="conceptos">
          <thead>
            <tr>
              <th class="title_text">DESCRIPCIÓN DE CONCEPTOS</th>
              <th class="title_text">UNIDAD</th>
              <th class="title_text">VAL UNIT</th>
              <th class="title_text">IMP POSITIVO</th>
              <th class="title_text">IMP NEGATIVO</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in positive" :key="index">
              <td class="text-start item_text">{{ item.name }}</td>
              <td class="text-end  item_text">{{ item.qty }}</td>
              <td class="text-end item_text">{{ item.unit }}</td>
              <td class="text-end item_text">{{ item.value }}</td>
              <td></td>
            </tr>
            <tr class="row-conceptos">
              <td class="title_text font-weight-black">SUELDO BRUTO</td>
              <td></td>
              <td></td>
              <td class="text-end title_text font-weight-black">{{ totalPositive.toFixed(2) }}</td>
              <td></td>
            </tr>
            <tr v-for="(item, index) in negative" :key="index">
              <td class="text-start item_text">{{ item.name }}</td>
              <td class="text-end item_text">{{ item.qty }}</td>
              <td class="text-end item_text">{{ item.unit }}</td>
              <td></td>
              <td class="text-end item_text">{{ item.value }}</td>
            </tr>
            <tr class="row-conceptos">
              <td class="title_text font-weight-black">TOTAL RETENCIONES</td>
              <td></td>
              <td></td>
              <td></td>
              <td class="text-end title_text font-weight-black">{{ totalNegative.toFixed(2) }}</td>
            </tr>

            <tr v-for="(item, index) in additional" :key="index">
              <td class="text-start item_text">{{ item.name }}</td>
              <td class="text-end item_text">{{ item.qty }}</td>
              <td class="text-end item_text">{{ item.unit }}</td>
              <td class="text-end item_text">{{ item.value }}</td>
              <td></td>

            </tr>
            <tr class="row-conceptos">

              <td class="cell-withe"></td>
              <td class="title_text font-weight-black">SUB-TOTAL</td>
              <td class="text-end title_text font-weight-black">{{ subTotalPositive.toFixed(2) }}</td>
              <td class="text-end title_text font-weight-black">{{ totalNegative }}</td>
              <td class="text-end title_text font-weight-black"> {{ subTotalPositive - totalNegative }}</td>
            </tr>
            <tr class="row-conceptos">

              <td class="cell-withe"></td>
              <td class="title_text font-weight-black">REDONDEO</td>
              <td class="text-end title_text"></td>
              <td class="text-end title_text"></td>
              <td class="text-end title_text font-weight-black">{{ redondeo }}</td>
            </tr>
            <tr class="row-conceptos">
              <td class="title_text">SON PESOS: {{ receipt.totalString }}</td>
              <td class="title_text font-weight-black">TOTAL</td>
              <td></td>
              <td></td>
              <td class="text-end title_text font-weight-black">${{ totalCobrar.toFixed(2) }}</td>
            </tr>

          </tbody>
        </table>
      </section>

      <footer>
        <v-row>
          <v-col class="d-flex justify-center header-p pa-0 borders font-weight-black" cols="6">
            <p>{{ receipt.bank }}</p>
          </v-col>
          <v-col class="d-flex justify-center header-p pa-0 borders font-weight-black" cols="6">
            <p>CBU {{ receipt.cbu }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center header-p borders pb-16" cols="6">
            <p>FIRMA Y SELLO DEL EMPLEADOR</p>
          </v-col>
          <v-col class="d-flex justify-center header-p borders pb-16" cols="6">
            <p class="pa-0 ma-0"> FIRMA DEL EMPLEADO </p>
          </v-col>
        </v-row>


      </footer>
    </v-card>

  </div>
</template>

<script lang="ts" setup>
import { EmployeeReceiptInterface, RECEIPT_ITEMS_TYPES, ReceiptDetail } from '@/stores/base/Employee/employee.interface';
import { onMounted, ref, watch } from 'vue';


const props = defineProps<{
  receipt: EmployeeReceiptInterface,
  logo: string
}>()

const receipt = ref( {} as EmployeeReceiptInterface)
const logo = ref('')

let positive = ref([] as ReceiptDetail[])
let negative = ref([] as ReceiptDetail[])
let additional = ref([] as ReceiptDetail[])
let totalPositive = ref(0)
let totalNegative = ref(0)
let redondeo = ref(0)
let totalCobrar = ref(0)
let subTotalPositive = ref(0)

watch(() => props.receipt, (value) => {

  receipt.value = value
  logo.value = props.logo 

  positive.value = receipt.value.details.filter(item => item.type === RECEIPT_ITEMS_TYPES.positive && Number(item.value) > 0) ?? {} as ReceiptDetail[]
  negative.value = receipt.value.details.filter(item => item.type === RECEIPT_ITEMS_TYPES.negative && Number(item.value) > 0) ?? {} as ReceiptDetail[]
  additional.value = receipt.value.details.filter(item => item.type === RECEIPT_ITEMS_TYPES.additional && Number(item.value) > 0) ?? {} as ReceiptDetail[]

  totalPositive.value = receipt.value.details.filter(item => item.type === RECEIPT_ITEMS_TYPES.totalPositive).reduce((acc, item) => acc + Number(item.value), 0)
  totalNegative.value = receipt.value.details.filter(item => item.type === RECEIPT_ITEMS_TYPES.totalNegative).reduce((acc, item) => acc + Number(item.value), 0)

  redondeo.value = Number(receipt.value.details.find(item => item.type === RECEIPT_ITEMS_TYPES.rounded)?.value ?? 0)
  totalCobrar.value = Number(receipt.value.details.find(item => item.type === RECEIPT_ITEMS_TYPES.totalCobrar)?.value ?? 0)

  subTotal()
})

onMounted(() => {

})







const calculateSubTotals = (items) => {

  const total = items.reduce((acc, item) => {
    console.log(item.value)
    return acc + Number(item.value)

  }, 0)

  return Number(total).toFixed(2)
}

const subTotal = () => {
  subTotalPositive.value = Number((Number(calculateSubTotals(additional.value)) + Number(calculateSubTotals(positive.value))).toFixed(2))
}

</script>

<style scoped>
body {
  font-size: 9px;
  margin: 0;
  padding: 0;
  background-color: white;

}

.borders{
  border: 0.2px solid #f2f2f2;
  border-radius: 0px;
}
.item_text {
  font-size: 9px;
}

.title_text {
  font-size: 9px;
}

body {
  font-family: Arial, sans-serif;
  font-size: 8px;
  line-height: 1.3;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border-left: 1px solid #f2f2f2;
  border-right: 1px solid #f2f2f2;
  padding: 2px;
  text-align: left;
  font-size: small;
}

th:first-child,
td:first-child {
  border-left: none;
}

th:last-child,
td:last-child {
  border-right: none;
}

th {
  background-color: #f2f2f2;
}

.totales {
  font-weight: bold;
}

footer {
  text-align: right;
  margin-top: 20px;
}

.row-conceptos {
  background-color: #f2f2f2;
}

.cell-withe {
  background-color: white;
}

.header-p {
  font-size: 9px;
}

.header-date {
  font-size: 8px;
}

.header-subtitle {
  font-size: 9px;
}

@media print {
  .row-conceptos {
    background-color: #f2f2f2 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  th {
    background-color: #f2f2f2 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>