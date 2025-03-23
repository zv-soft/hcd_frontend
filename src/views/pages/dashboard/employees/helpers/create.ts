import { ref } from "vue";
import FamilyGroup from "../modals/familyGroup.vue";

export const newEmployee =ref({
    id:0,
    name:'',
    lastName:'',
    address:'',
    dni:'',
    email:'',
    dob:'',
    studies:1,
    cuil:'',
    phoneNumber:'',
    employeeRecord:'',
    category:0,
    functionEmployee:'',
    basicSalary:'',
    seniority:'',
    startDate:'',
    startDateCategory:'',
    cbu:'',
    bank:'',
    mudon:false,
    upcn:false,
    muoem:false,
    politicalContribution:false,
    affiliationUoem:false,
    remunerative:false,
    familyGroups: [],
    ordinanceAdjustments: []
})