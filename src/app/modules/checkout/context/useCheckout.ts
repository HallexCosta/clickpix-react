import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  createContext,
  useContext
} from 'react'

export type Order = {
  appid: string
  comment?: string
  productId: string
  correlationID: string
  value?: number
  additionalInfo?: string
  status?: string
  payerTaxID: string
  payerEmail: string
  payerName?: string
  payerPhone?: string
  paymentLinkUrl?: string
  chargeDetailRef?: MutableRefObject<HTMLDivElement | null>
}

type CheckoutContextProps = {
  currentOrder?: Order | null
  currentChargeDetailRef: MutableRefObject<HTMLDivElement>
  setCurrentChargeDetailRef: Dispatch<
    SetStateAction<MutableRefObject<HTMLDivElement>>
  >
  updateCheckoutData: (selectedProductId: string, data: Order) => void
  productId: string
  products: Map<string, Order>
  setProductId: Dispatch<SetStateAction<string>>
  closeCheckoutModal: () => void
  openCheckoutModal: (productId: string) => void
  getProduct: (productId: string) => Order | undefined
  checkoutRef: MutableRefObject<HTMLDivElement | null>
  requesting: boolean
  setRequesting: Dispatch<SetStateAction<boolean>>
}

export const CheckoutContext = createContext<CheckoutContextProps>(
  {} as CheckoutContextProps
)

// Custom hook to access the context
export const useCheckout = () => {
  return useContext(CheckoutContext)
}
