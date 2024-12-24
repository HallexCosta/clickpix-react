import type { Order } from '@/app/modules/checkout/context/useCheckout'

declare global {
  interface Window {
    $openpix: {
      push: (...data: any) => void
    }
    $openpixSDK: {
      updateIn: (
        memoryId: string | number,
        state: string,
        updatedOrder: Order
      ) => boolean
      get: (memoryId: string | number, state: string) => object
      addEvent: (
        hookName: string,
        hookHandler: (...args: any[]) => Promise<void>
      ) => boolean
    }
  }
}
