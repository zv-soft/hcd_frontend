import type { Role } from "./roles.interface"

export interface UsersPaginationsInterface {

  data:UserInterface[]
  totalPages:number
}
export interface UserInterface {
  id: number
  email: string
  fullName: string
  isActive: boolean
  profile: Profile
  roles: Role[],
}

export interface Profile {
  id: number
  secondary_email?: string
  nationality?: string
  country_residence: any
  civil_status?: string
  image?: string
  phone?: string
  city?: string
  linkedin_url: any
}
