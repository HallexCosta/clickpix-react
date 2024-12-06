import { useState } from 'react'
import { type Order, useCheckout } from '../context/useCheckout'

export const globalHookIds = new Map([
  ['beforeCreateCharge', 'before_create_charge_unique_id']
])
export const globalEventHooks = new Map()

const nextFn = (calledHookName: string) =>
  globalHookIds.get(calledHookName) ?? ''

export const useEventHooks = () => {
  const [hooks, setHooks] = useState(globalEventHooks)

  const { products } = useCheckout()

  const addHook = (
    hookName: string,
    hookHandler: (
      nextFn: () => string,
      products: Map<string, Order>,
      productId: string
    ) => string | null | undefined
  ) => {
    // if (!handlers[hookName]) {
    //   console.error('hook not available')
    //   return false
    // }
    if (hookHandler[Symbol.toStringTag] !== 'AsyncFunction') {
      return console.error('Only supported asynchronous function')
    }

    const boundedHookHandler = hookHandler.bind(
      null,
      nextFn.bind(null, hookName),
      products
    )

    hooks.set(hookName, boundedHookHandler)
  }

  return {
    addHook,
    hooks
  }
}
