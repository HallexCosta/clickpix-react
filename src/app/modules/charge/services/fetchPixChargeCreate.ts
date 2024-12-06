import { createPromiseWithResolvers } from '../../../../common/createPromiseWithResolvers'
import { config } from '../../../../config/config'

export interface Charge {
  correlationID: string
  value: number
  comment: string
  customer: Customer
  additionalInfo: AdditionalInfo[]
}

export interface Customer {
  name: string
  taxID: string
  email: string
  phone: string
}

export interface AdditionalInfo {
  key: string
  value: string
}

export const fetchPixChargeCreate = (charge: Charge) => {
  const { promise, resolve } = createPromiseWithResolvers()

  fetch(`${config.restApiBaseURL}/charge`, {
    method: 'POST',
    body: JSON.stringify(charge),
    mode: 'cors',
    headers: {
      Authorization: config.appID,
      'Content-Type': 'application/json'
    }
  })
    .then((r) => r.json())
    .then(resolve)
    .catch(() => resolve(null))

  return promise
}
