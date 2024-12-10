import { memo, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'

import './index.css'

import { $initializeOpenpixSDK } from '../sdk/$openpixSDK'
import { ChargeDetailWithIframeByCorrelationID } from './app/modules/charge/components/ChargeDetailWithIframeByCorrelationID'
import { Checkout } from './app/modules/checkout/components/Checkout'
import { ClickPixButton } from './app/modules/checkout/components/ClickPixButton'
import { CheckoutProvider } from './app/modules/checkout/context/CheckoutProvider'
import { useCheckout } from './app/modules/checkout/context/useCheckout'

type CustomClickPixButton = {
  productId: string
  htmlClickPix: HTMLDivElement
  isProductIdRepeated: boolean
}

const CustomizeClickPixButtons = memo(
  ({
    allClickPix
  }: {
    allClickPix: CustomClickPixButton[]
  }) => {
    return Array.from(
      allClickPix,
      ({ htmlClickPix, productId, isProductIdRepeated }) => {
        return createPortal(
          <ClickPixButton
            productId={productId}
            isProductIdRepeated={isProductIdRepeated}
          />,
          htmlClickPix
        )
      }
    )
  }
)
CustomizeClickPixButtons.displayName = 'CustomizeClickPixButtons'

const App = () => {
  const { products, updateCheckoutData } = useCheckout()

  const [allClickPix, setAllClickPix] = useState<CustomClickPixButton[]>([])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLDivElement>('.clickpix')

    for (const htmlClickPix of elements) {
      htmlClickPix.classList.add('w-fit')

      const productId = htmlClickPix.dataset.productId
      if (!productId) {
        console.error('[data-product-id] need a unique value', productId)
        return
      }
      if (!products.has(productId)) {
        updateCheckoutData(productId, {
          value: Number(htmlClickPix.dataset.value),
          additionalInfo: htmlClickPix.dataset.additionalInfo,
          status: 'CHARGE_NOT_EMITTED',
          productId
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
        console.log(htmlClickPix)
        console.error('[data-product-id] cannot have a duplicate value')
      }
    }
  }, [])

  return (
    <>
      {/* <ChargeDetailWithIframeByCorrelationID
        key={'1'}
        paymentLinkUrl={
          'https://openpix.com.br/pay/5aedf0c7-b6d2-4dd7-8f3e-076b7d65f164'
        }
        productId={'1'}
      /> */}

      <CustomizeClickPixButtons allClickPix={allClickPix} />

      {/* <ChargeDetailByCorrelationID productId={'1'} /> */}

      {Array.from(products).map(
        ([productId, order]) =>
          order.paymentLinkUrl && (
            <ChargeDetailWithIframeByCorrelationID
              key={productId}
              paymentLinkUrl={order.paymentLinkUrl}
              productId={productId}
            />
          )
      )}

      <Checkout />
    </>
  )
}

let rootEl = document.getElementById('root')

if (!rootEl) {
  const root = document.createElement('div')
  root.setAttribute('id', 'root')
  document.body.append(root)
}

rootEl = document.getElementById('root')

if (rootEl) {
  const root = createRoot(rootEl)
  root.render(
    <CheckoutProvider>
      <App />
    </CheckoutProvider>
  )
}

$initializeOpenpixSDK()
