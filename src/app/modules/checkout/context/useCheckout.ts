import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  createContext,
  useContext
} from 'react'

export type Order = {
  readonly appid: string
  comment: string
  readonly productId: string
  readonly correlationID: string
  readonly value: number
  additionalInfo: string
  readonly status: string | 'CHARGE_NOT_EMITTED' | 'CHARGE_EMITTED'
  payerTaxID: string
  payerEmail: string
  payerName: string
  payerPhone: string
  readonly paymentLinkUrl: string
  readonly identifier: string
  readonly expiresIn: number
  readonly brCode: string
  readonly createdAt: Date | null
  readonly isFromTestAccount: boolean
  readonly expiresDate: Date | null
  readonly companyNameFriendly: string
  readonly companyTaxID: string
  readonly transactionID: string
  readonly paymentMethod: 'PIX' | string
  readonly paymentStatus: 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | ''
  readonly chargeDetailRef: MutableRefObject<HTMLDivElement | null>
  readonly hookId: string
}

export type CheckoutContextProps = {
  currentModal: 'checkout' | 'pending' | 'active' | 'expired' | 'completed' | ''
  setCurrentModal: Dispatch<
    SetStateAction<CheckoutContextProps['currentModal']>
  >
  currentOrder?: Order | null
  currentChargeDetailRef: MutableRefObject<HTMLDivElement> | null
  setCurrentChargeDetailRef: Dispatch<
    SetStateAction<MutableRefObject<HTMLDivElement> | null>
  >
  updateCheckoutData: (productId: string, data: Order) => void
  selectedProductId: string
  setSelectedProductId: Dispatch<SetStateAction<string>>
  products: Map<string, Order>
  closeCheckoutModal: () => void
  openCheckoutModal: (productId: string) => void
  getProduct: (productId: string) => Order | null
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
