export interface EmployeesWithPaginationInterface {
    data: EmployeesInterface
    meta: Meta
  }

interface Meta {
    totalPage: number
    totalItems: number
}

export type EmployeesInterface = EmployeeInterface[]

export interface EmployeeInterface {
  id: number
  name: string
  lastName: string
  address: string
  dni: string
  email: string
  dob: string
  cuil: string
  phoneNumber: string
  employeeRecord: string
  functionEmployee: string
  basicSalary: string
  seniority: number
  startDate: string
  startDateCategory: string
  cbu: string
  bank: string
  mudon: boolean
  upcn: boolean
  muoem: boolean
  politicalContribution: boolean
  affiliationUoem: boolean
  remunerative: boolean
  studies: Studies
  category: Category
  familyGroups: any[]
  ordinanceAdjustments: any[]
}

export interface Studies {
  id: number
  code: string
  name: string
}

export interface Category {
  id: number
  name: string
  basic: number
  status: boolean
  plant?: Plant
}

export interface Plant {
  id: number
  name: string
  status: boolean
}

export interface EmployeeReceiptInterface {
  employee: EmployeeReceipt
  legajo: string
  basicSalary: string
  period: string
  bank: string
  cbu: string
  totalString:string
  details: ReceiptDetail[]
}

interface EmployeeReceipt {
  fullName: string
  cuit: string
  category: string
  employeeFunction: string
  startDate: string
}

export interface ReceiptDetail {
  name: string
  type: string
  value: string
  qty?: string
  unit?: string
}


export interface ReceiptListInterface {
  employeeRecord: string;
  fullName: string;
  year: number;
  month: number;
  basicSalary: number;
  totalSalary: number;
}


export const RECEIPT_ITEMS_TYPES = {
  positive: 'positivo',
  negative: 'negativo',
  additional: 'adicionales',
  total: 'total',
  rounded: 'redondeo',
  totalCobrar: 'totalCobrar',
  totalPositive: 'totalPositivo',
  totalNegative: 'totalNegativo',
}