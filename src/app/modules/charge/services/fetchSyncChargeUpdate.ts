import type { MutableRefObject } from 'react'
import type { Order } from '../../checkout/context/useCheckout'
import { CheckoutEventBusEnum, EventBus } from '../../event-bus/EventBus'
import { fetchPixChargeQuery } from './fetchPixChargeQuery'

export const fetchSyncChargeUpdateStatus = (
  order: Order,
  ref: MutableRefObject<number>
) => {
  const memorySyncChargeUpdateTimeoutId = setTimeout(() => {
    console.log({
      memorySyncChargeUpdateTimeoutId,
      correlationID: order.correlationID
    })
    fetchPixChargeQuery(order.correlationID, order.appid)
      .then(({ data }) => {
        const paymentStatus = data.charge.status ?? ''

        if (paymentStatus === 'COMPLETED') {
          const newOrder = {
            ...order,
            paymentStatus
          }
          EventBus.emit(CheckoutEventBusEnum.UPDATE_CHECKOUT_DATA, [
            order.productId,
            newOrder
          ])
          EventBus.emit(CheckoutEventBusEnum.SET_CURRENT_MODAL, ['completed'])
          return console.log('stop fetchSyncChargeUpadateStatus')
        }
        if (paymentStatus === 'EXPIRED') {
          const newOrder = {
            ...order,
            paymentStatus
          }
          EventBus.emit(CheckoutEventBusEnum.UPDATE_CHECKOUT_DATA, [
            order.productId,
            newOrder
          ])
          EventBus.emit(CheckoutEventBusEnum.SET_CURRENT_MODAL, ['expired'])
          return console.log('stop fetchSyncChargeUpadateStatus')
        }

        return fetchSyncChargeUpdateStatus(order, ref)
      })
      .catch((e) => console.log('catch the error', e.message))
  }, 2000)
  ref.current = memorySyncChargeUpdateTimeoutId
}
