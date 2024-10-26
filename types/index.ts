import { User, Country, VisaType, VisaApplication } from '@prisma/client'

export type SafeUser = Omit<User, 'password'> & {
  createdAt: string
  updatedAt: string
}

export interface CountryWithVisaTypes extends Country {
  visaTypes: VisaType[]
}

export interface ApplicationWithRelations extends VisaApplication {
  country: Country
  visaType: VisaType
  user: SafeUser
}