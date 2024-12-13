import type { CreateAdditionalInfoRequest } from './CreateAdditionalInfoRequest'
import type { CreateCustomerRequest } from './CreateCustomerRequest'

export interface CreateChargeRequest {
  correlationID: string
  value: number
  comment: string
  customer: CreateCustomerRequest
  additionalInfo: CreateAdditionalInfoRequest[]
}
