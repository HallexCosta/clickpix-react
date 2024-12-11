import { CheckoutEventBusEnum, EventBus } from '../../event-bus/EventBus'
import { globalProducts } from '../../products/hooks/useProducts'
import { fetchPixChargeQuery } from './fetchPixChargeQuery'

export const fetchSyncPaymentLink = (
  productId: string,
  correlationID: string,
  appid: string
) => {
  const memorySyncPaymentLinkTimeoutId = setTimeout(() => {
    console.log({ correlationID })
    fetchPixChargeQuery(correlationID, appid)
      .then(({ data }) => {
        console.log('start here', data)

        if (!data.charge) {
          return fetchSyncPaymentLink(productId, correlationID, appid)
        }

        const paymentLinkUrl = data.charge.paymentLinkUrl

        EventBus.emit(CheckoutEventBusEnum.UPDATE_CHECKOUT_DATA, [
          productId,
          {
            ...globalProducts.get(productId),
            paymentLinkUrl
          }
        ])
      })
      .catch((e) => console.log('catch the error', e.message))
  }, 2000)
}
