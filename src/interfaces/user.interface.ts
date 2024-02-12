
export interface AuthInterface {
  id: number
  email: string
  fullName: string
  dni: any
  isActive: boolean
  enable_shared: boolean
  profile: Profile
  roles: Role[],

  token: string
}

interface Role {
  id:number,
  name:string,
}

export interface Profile {
  secondary_email: string
  nationality: string
  country_residence: any
  civil_status: string
  image: any
  phone: string
  city: string
  linkedin_url: any
}
