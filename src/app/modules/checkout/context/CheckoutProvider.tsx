import { useState } from 'react'
import { CheckoutEventBusEnum, EventBus } from '../../event-bus/EventBus'
import { useProducts } from '../../products/hooks/useProducts'
import { CheckoutContext, type Order } from './useCheckout'

// Provider component
export const CheckoutProvider = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<
    'checkout' | 'pending' | 'active' | 'completed' | 'expired' | ''
  >('checkout')
  const [getProduct, updateProduct, products] = useProducts()
  const [requesting, setRequesting] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [selectedProductId, setSelectedProductId] = useState<string>('')

  const updateCheckoutData = (productId: string, data: Order) => {
    if (!productId) {
      console.error(
        'cannot update currentOrder if productId is empty string or null'
      )
      return false
    }

    const oldProduct = getProduct(productId)

    if (!oldProduct) {
      console.error('Product id not found:', productId)
      return false
    }

    if (oldProduct?.value !== undefined && data.value !== oldProduct?.value) {
      console.error('The value from charge cannot be changed')
      return false
    }

    updateProduct(productId, data)
    return true
  }
  EventBus.subscribe(
    CheckoutEventBusEnum.UPDATE_CHECKOUT_DATA,
    updateCheckoutData
  )

  EventBus.subscribe(
    CheckoutEventBusEnum.SET_SELECTED_PRODUCT_ID,
    setSelectedProductId
  )
  EventBus.subscribe(CheckoutEventBusEnum.SET_CURRENT_MODAL, setCurrentModal)

  return (
    <CheckoutContext.Provider
      value={{
        currentOrder,
        updateCheckoutData,
        selectedProductId,
        setSelectedProductId,
        products,
        getProduct,
        requesting,
        setRequesting,
        currentModal,
        setCurrentModal
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}
