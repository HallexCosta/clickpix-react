import { CheckoutEventBusEnum, EventBus } from '../../event-bus/EventBus'
import { globalProducts } from '../../products/hooks/useProducts'
import { fetchPixChargeQuery } from './fetchPixChargeQuery'

export const fetchSyncPaymentLink = (
  productId: string,
  correlationID: string
) => {
  const memorySyncPaymentLinkTimeoutId = setTimeout(() => {
    console.log({ correlationID })
    fetchPixChargeQuery(correlationID)
      .then(({ data }) => {
        console.log('iniciei aqui', data)

        if (!data.charge) {
          return fetchSyncPaymentLink(productId, correlationID)
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
      .catch((e) => console.log('cai no erro', e.message))
  }, 2000)
}
