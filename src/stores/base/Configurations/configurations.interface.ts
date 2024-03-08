export type PlantsInterfaceList = PlantInterface[]

export interface PlantInterface {
  id: number
  name: string
  status: boolean
  category: Category[]
}

export interface Category {
  id: number
  name: string
  basic: number
  status: boolean
}

export type StudyInterfaceList = StudyInterface[]

export interface StudyInterface {
  id: number;
  code: string;
  name: string;
}

