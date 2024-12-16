import React, {
  type MutableRefObject,
  useEffect,
  useRef,
  useState
} from 'react'
import { CheckoutEventBusEnum, EventBus } from '../../event-bus/EventBus'
import { useProducts } from '../../products/hooks/useProducts'
import { CheckoutContext, type Order } from './useCheckout'

// Provider component
export const CheckoutProvider = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<
    'checkout' | 'pending' | 'paid' | 'expired'
  >('checkout')
  const [getProduct, updateProduct, products] = useProducts()
  const [requesting, setRequesting] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [currentChargeDetailRef, setCurrentChargeDetailRef] =
    useState<MutableRefObject<HTMLDivElement> | null>(null)
  const [selectedProductId, setSelectedProductId] = useState<string>('')

  const updateCheckoutData = (productId: string, data: Order) => {
    console.log('updateCheckoutData')
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

  const checkoutRef = useRef<HTMLDivElement>(null)
  const closeCheckoutModal = () => {
    if (!checkoutRef.current) return console.log('Checkout cannot be null')

    // checkoutRef.current.classList.add('hidden')
    setSelectedProductId('')
    setCurrentOrder(null)
  }
  EventBus.subscribe('closeCheckoutModal', closeCheckoutModal)

  const openCheckoutModal = (productId: string) => {
    if (!checkoutRef.current) return console.log('checkout cannot be null')

    // checkoutRef.current.classList.remove('hidden')
    setSelectedProductId(productId)
    setCurrentOrder(getProduct(productId))
  }
  // EventBus.subscribe('openCheckoutModal', openCheckoutModal)

  return (
    <CheckoutContext.Provider
      value={{
        currentOrder,
        updateCheckoutData,
        selectedProductId,
        setSelectedProductId,
        checkoutRef,
        closeCheckoutModal,
        openCheckoutModal,
        products,
        getProduct,
        currentChargeDetailRef,
        setCurrentChargeDetailRef,
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
