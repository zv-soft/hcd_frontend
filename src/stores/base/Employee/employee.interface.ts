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
  function: string
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
