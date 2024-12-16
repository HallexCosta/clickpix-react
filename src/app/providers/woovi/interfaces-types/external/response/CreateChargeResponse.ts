import type { CreateAdditionalInfoResponse } from './CreateAdditionalInfoResponse'

export interface CreateChargeResponse {
  error?: string
  charge: ChargeaResponse
}

export interface ChargeaResponse {
  value: number
  comment: string
  identifier: string
  correlationID: string
  transactionID: string
  status: string
  additionalInfo: CreateAdditionalInfoResponse[]
  fee: number
  discount: number
  valueWithDiscount: number
  expiresDate: string
  type: string
  paymentLinkID: string
  createdAt: string
  updatedAt: string
  customer: CustomerResponse
  paidAt: string
  payer: Payer
  brCode: string
  expiresIn: number
  pixKey: string
  paymentLinkUrl: string
  qrCodeImage: string
  globalID: string
  paymentMethods: CreatePaymentMethodsResponse
}

export interface CustomerResponse {
  name: string
  email: string
  phone: string
  correlationID: string
  taxID: TaxIdResponse
}

export interface Payer {
  name: string
  email: string
  phone: string
  correlationID: string
  taxID: TaxIdResponse
}

export interface TaxIdResponse {
  taxID: string
  type: string
}

export interface CreatePaymentMethodsResponse {
  pix: PixResponse
}

export interface PixResponse {
  method: string
  txId: string
  value: number
  status: string
  fee: number
  brCode: string
  transactionID: string
  identifier: string
  qrCodeImage: string
}
