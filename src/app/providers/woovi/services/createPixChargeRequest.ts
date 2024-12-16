import { createPromiseWithResolvers } from '@/common/createPromiseWithResolvers'
import { config } from '@/config/config'
import type { CreateChargeRequest } from '../interfaces-types/external/request/CreateChargeRequest'
import type { CreateChargeResponse } from '../interfaces-types/external/response/CreateChargeResponse'

export const createPixChargeRequest = (
  charge: CreateChargeRequest,
  appid: string
): Promise<CreateChargeResponse> => {
  const { promise, resolve } =
    createPromiseWithResolvers<CreateChargeResponse>()

  fetch(`${config.restApiBaseURL}/charge`, {
    method: 'POST',
    body: JSON.stringify(charge),
    mode: 'cors',
    headers: {
      Authorization: appid,
      'Content-Type': 'application/json'
    }
  })
    .then((r) => r.json())
    .then(resolve)
    .catch(() => resolve(null))

  return promise
}
