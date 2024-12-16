import { generateCorrelationUniqueId } from '../../../../common/generateCorrelationUniqueId'
import {
  checkChargeIsExpired,
  checkIsExpiredCharge
} from '../../charge/common/checkIsExpiredCharge'
import { ExpiredPixChargeDetailEventBusEnum } from '../../charge/components/ExpiredPixChargeReceipt'
import { PaidPixChargeReceiptEventBusEnum } from '../../charge/components/PaidPixChargeReceipt'
import { ChargeDetailByCorrelationIDEventBusEnum } from '../../charge/components/PendingPixCharge'
import { EventBus } from '../../event-bus/EventBus'
import {
  type CheckoutContextProps,
  type Order,
  useCheckout
} from '../context/useCheckout'

type ClickPixButtonProps = {
  productId: string
  isProductIdRepeated: boolean
}

export const ClickPixButton = ({
  productId,
  isProductIdRepeated
}: ClickPixButtonProps) => {
  const {
    setSelectedProductId,
    setCurrentModal,
    products,
    currentModal,
    updateCheckoutData,
    getProduct
  } = useCheckout()

  const handleOnClickButton = () => {
    const order = products.get(productId)
    console.log('handleOnClickButton', { currentModal }, order)
    if (!order) {
      return console.error('Order not found', productId)
    }

    setSelectedProductId(productId)

    if (order.paymentStatus.toLocaleLowerCase() === '') {
      setCurrentModal(currentModal === '' ? 'checkout' : currentModal)
      return
    }

    const paymentStatus = order.paymentStatus.toLocaleLowerCase()

    console.log(
      currentModal === 'active',
      checkIsExpiredCharge(order.expiresDate),
      currentModal,
      paymentStatus,
      order
    )
    console.log(
      (currentModal === 'active' && checkIsExpiredCharge(order.expiresDate)) ||
        paymentStatus === 'expired' ||
        currentModal === 'expired'
    )

    // const mockExpire = new Date(order.createdAt?.getTime() + 3 * 1000)
    // console.log('mockExpire', mockExpire)
    // console.log(checkIsExpiredCharge(mockExpire))

    if (
      (paymentStatus === 'active' && checkIsExpiredCharge(order.expiresDate)) ||
      paymentStatus === 'expired' ||
      currentModal === 'expired'
    ) {
      updateCheckoutData(productId, {
        ...order,
        paymentStatus: 'EXPIRED'
      })
      setCurrentModal('expired')
      return console.log('show expired modal')
    }

    setCurrentModal(paymentStatus as CheckoutContextProps['currentModal'])
  }

  const defaultFn = () => {}

  return (
    <button
      onClick={isProductIdRepeated ? defaultFn : handleOnClickButton}
      className="w-fit border-0 outline-none px-4 py-3 bg-woovi rounded-full text-xs flex items-center justify-center gap-1 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 21 21"
      >
        <path
          fill="#000"
          d="M9.478 20.453a2.321 2.321 0 0 1-2.134-1.402L6.72 17.6l-1.075 1.076a2.323 2.323 0 1 1-3.286-3.287l1.075-1.075-1.45-.626A2.323 2.323 0 0 1 2.34 9.3l8.763-2.191a2.336 2.336 0 0 1 2.208.611c.574.574.808 1.42.611 2.209l-2.19 8.765a2.322 2.322 0 0 1-2.254 1.759Zm-2.5-4.98a.77.77 0 0 1 .71.467l1.078 2.496a.775.775 0 0 0 1.463-.118l2.19-8.765a.77.77 0 0 0-.203-.737.77.77 0 0 0-.737-.204l-8.763 2.191a.775.775 0 0 0-.118 1.463l2.496 1.079a.775.775 0 0 1 .24 1.259l-1.88 1.881a.774.774 0 1 0 1.095 1.096l1.88-1.882a.775.775 0 0 1 .548-.227ZM19.64 9.51h-3.097a.775.775 0 0 1 0-1.55h3.098a.775.775 0 0 1 0 1.55ZM16.825 14.761l-2.191-2.191a.775.775 0 0 1 1.095-1.096l2.191 2.192a.775.775 0 0 1-1.095 1.095ZM8.417 6.403 6.227 4.21a.775.775 0 0 1 1.095-1.095l2.19 2.191a.775.775 0 0 1-1.095 1.096ZM12.25 5.268a.775.775 0 0 1-.774-.775V1.394a.775.775 0 1 1 1.55 0v3.1a.775.775 0 0 1-.775.774ZM14.99 6.403a.775.775 0 0 1 0-1.096l2.19-2.191a.774.774 0 1 1 1.095 1.095l-2.19 2.192a.774.774 0 0 1-1.096 0Z"
        ></path>
      </svg>
      <div className="flex">
        Pagar com
        <strong className="ml-1">click</strong>
        pix
      </div>
    </button>
  )
}
