import { useEffect, useRef, useState } from 'react'
import { ExpiredPixChargeReceipt } from './app/modules/charge/components/ExpiredPixChargeReceipt'
import { PaidPixChargeReceipt } from './app/modules/charge/components/PaidPixChargeReceipt'
import { PendingPixCharge } from './app/modules/charge/components/PendingPixCharge'
import { Checkout } from './app/modules/checkout/components/Checkout'
import {
  type Order,
  useCheckout
} from './app/modules/checkout/context/useCheckout'
import {
  type RenderClickPixButton,
  RenderClickPixButtons
} from './app/modules/clickpix/components/RenderClickPixButtons'

const RenderCheckoutChargePix = ({
  orders
}: { orders: Map<string, Order> }) => {
  const { selectedProductId, currentModal } = useCheckout()
  
  return Array.from(orders, ([productId, order]) => {
    const shouldViewChargePixCheckout =
      order.status === 'CHARGE_NOT_EMITTED' &&
      productId === selectedProductId &&
      currentModal === 'checkout'

    return (
      shouldViewChargePixCheckout && <Checkout key={productId} order={order} />
    )
  })
}

const RenderPendingPixCharges = ({
  orders
}: { orders: Map<string, Order> }) => {
  const { selectedProductId, currentModal } = useCheckout()


  return Array.from(orders, ([productId, order]) => {
    const shouldViewRenderPendingPixCharge =
      order.status === 'CHARGE_EMITTED' &&
      order.paymentStatus === 'ACTIVE' &&
      productId === selectedProductId &&
      currentModal === 'active'

    return (
      shouldViewRenderPendingPixCharge && (
        <PendingPixCharge key={selectedProductId} order={order} />
      )
    )
  })
}

const RenderPaidPixChargeReceipts = ({
  orders
}: { orders: Map<string, Order> }) => {
  const { selectedProductId, currentModal } = useCheckout()
  return Array.from(orders, ([productId, order]) => {
    const shouldViewPaidPixChargeReceipt =
      order.status === 'CHARGE_EMITTED' &&
      order.paymentStatus === 'COMPLETED' &&
      productId === selectedProductId &&
      currentModal === 'completed'

    return (
      shouldViewPaidPixChargeReceipt && (
        <PaidPixChargeReceipt key={productId} order={order} />
      )
    )
  })
}

const RenderExpiredPixChargeReceipts = ({
  orders
}: { orders: Map<string, Order> }) => {
  const { selectedProductId, currentModal } = useCheckout()
  return Array.from(orders, ([productId, order]) => {
    const shouldViewExpiredPixChargeReceipt =
      order.status === 'CHARGE_EMITTED' &&
      order.paymentStatus === 'EXPIRED' &&
      productId === selectedProductId &&
      currentModal === 'expired'

    return (
      shouldViewExpiredPixChargeReceipt && (
        <ExpiredPixChargeReceipt key={productId} order={order} />
      )
    )
  })
}

export const App = () => {
  const { products } = useCheckout()

  const [allClickPix, setAllClickPix] = useState<RenderClickPixButton[]>([])

  const defaultRef = useRef(null)
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLDivElement>('.clickpix')

    const requiredDataAttributes = new Map([
      [
        'product-id',
        (...args: string[]) =>
          console.error('[data-product-id] need a unique value', ...args)
      ],
      [
        'appid',
        (...args: string[]) =>
          console.error('[data-appid] need a unique value', ...args)
      ]
    ])

    for (const htmlClickPix of elements) {
      htmlClickPix.classList.add('w-fit')

      const productId = htmlClickPix.dataset.productId
      const appid = htmlClickPix.dataset.appid

      if (!productId) {
        console.error('[data-product-id] need a unique value', productId)
        return
      }
      if (!appid) {
        console.error('[data-appid] need an appid', appid)
        return
      }
      if (!products.has(productId)) {
        products.set(productId, {
          appid,
          value: Number(htmlClickPix.dataset.value),
          additionalInfo: String(htmlClickPix.dataset.additionalInfo),
          status: 'CHARGE_NOT_EMITTED',
          productId,
          payerTaxID: '',
          payerEmail: '',
          correlationID: '',
          brCode: '',
          chargeDetailRef: defaultRef,
          comment: '',
          companyNameFriendly: '',
          companyTaxID: '',
          createdAt: null,
          paymentLinkUrl: '',
          expiresDate: null,
          expiresIn: 86400,
          identifier: '',
          payerName: '',
          payerPhone: '',
          paymentMethod: '',
          paymentStatus: '',
          transactionID: '',
          isFromTestAccount: false,
          hookId: ''
        })

        setAllClickPix((prev) => {
          return [
            ...prev,
            {
              productId,
              htmlClickPix,
              isProductIdRepeated: false
            }
          ]
        })
      } else {
        setAllClickPix((prev) => {
          return [
            ...prev,
            {
              productId,
              htmlClickPix,
              isProductIdRepeated: true
            }
          ]
        })
        htmlClickPix.classList.add(
          'ring-2',
          'ring-red-500',
          'ring-offset-0.5',
          'rounded-full'
        )
        console.error('[data-product-id] cannot have a duplicate value')
      }
    }
  }, [])

  return (
    <>
      <RenderClickPixButtons allClickPix={allClickPix} />

      <RenderCheckoutChargePix orders={products} />
      <RenderPendingPixCharges orders={products} />
      <RenderPaidPixChargeReceipts orders={products} />
      <RenderExpiredPixChargeReceipts orders={products} />
    </>
  )
}
