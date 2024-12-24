import type { Order } from '@/app/modules/checkout/context/useCheckout'

const properties: (keyof Order)[] = [
  'appid',
  'productId',
  'correlationID',
  'value',
  'status',
  'paymentLinkUrl',
  'identifier',
  'expiresIn',
  'brCode',
  'createdAt',
  'isFromTestAccount',
  'expiresDate',
  'companyNameFriendly',
  'companyTaxID',
  'transactionID',
  'paymentMethod',
  'paymentStatus'
]

export const validateImuttableProperties = {
  canMutate: (oldOrder: Order, updatedOrder: Order) => {
    let isValidMutation = true
    for (const orderKey of properties) {
      if (oldOrder[orderKey] !== updatedOrder[orderKey]) {
        console.error(
          `Cannot update property "${orderKey}". Old value: ${oldOrder[orderKey]}, New value: ${updatedOrder[orderKey]}`
        )
        isValidMutation = false
      }
    }
    return isValidMutation
  }
}
