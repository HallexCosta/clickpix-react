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
  const [getProduct, updateProduct, products] = useProducts()
  const [requesting, setRequesting] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [currentChargeDetailRef, setCurrentChargeDetailRef] =
    useState<MutableRefObject<HTMLDivElement> | null>(null)
  const [productId, setProductId] = useState<string>('')

  const updateCheckoutData = (productId: string, data: Order) => {
    if (!productId) {
      console.error(
        'cannot update currentOrder if productId is empty string or null'
      )
      return false
    }

    const oldProduct = getProduct(productId)

    if (oldProduct?.value !== undefined && data.value !== oldProduct?.value) {
      console.error('The value from charge cannot be changed')
      return false
    }

    setProductId(productId)
    updateProduct(productId, data)
    setCurrentOrder(getProduct(productId) ?? {})
    return true
  }
  EventBus.subscribe(
    CheckoutEventBusEnum.UPDATE_CHECKOUT_DATA,
    updateCheckoutData
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // console.log({ productId })
  }, [productId, getProduct])

  const checkoutRef = useRef<HTMLDivElement>(null)
  const closeCheckoutModal = () => {
    if (!checkoutRef.current) return console.log('checkout cannot be null')

    checkoutRef.current.classList.add('hidden')
    setProductId('')
    setCurrentOrder({})
  }
  EventBus.subscribe('closeCheckoutModal', closeCheckoutModal)

  const openCheckoutModal = (productId: string) => {
    if (!checkoutRef.current) return console.log('checkout cannot be null')

    checkoutRef.current.classList.remove('hidden')
    setProductId(productId)
    setCurrentOrder(getProduct(productId) ?? {})
  }
  EventBus.subscribe('openCheckoutModal', openCheckoutModal)

  return (
    <CheckoutContext.Provider
      value={{
        currentOrder,
        updateCheckoutData,
        productId,
        setProductId,
        checkoutRef,
        closeCheckoutModal,
        openCheckoutModal,
        products,
        getProduct,
        currentChargeDetailRef,
        setCurrentChargeDetailRef,
        requesting,
        setRequesting
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}
