import { additionalInfoMapper } from '../src/app/modules/charge/mapper/additionalInfoMapper'
import type { Order } from '../src/app/modules/checkout/context/useCheckout'
import {
  globalEventHooks,
  globalHookIds
} from '../src/app/modules/checkout/hooks/useEventHooks'
import {
  CheckoutEventBusEnum,
  EventBus
} from '../src/app/modules/event-bus/EventBus'
import { globalProducts } from '../src/app/modules/products/hooks/useProducts'

export const $initializeOpenpixSDK = () => {
  // openpix settings
  window.$openpix = window.$openpix || []

  // Export SDK for external usage
  const availableStates = ['products']

  window.$openpixSDK = {
    updateIn(memoryId: string, state: string, updatedData: Order) {
      console.log('> updateIn', memoryId, state, updatedData)
      const states = {
        products: globalProducts
      }

      if (!availableStates.includes(state)) {
        console.error('State not available')
        return false
      }

      const memory = states[state]
      if (!memory.has(memoryId)) {
        console.error(`MemoryId not found in ${state}`)
        return false
      }

      const oldData = memory.get(memoryId)
      if (updatedData.value !== oldData.value) {
        console.error('Cannot update property "value"')
        return false
      }

      const additionalInfos = additionalInfoMapper.toArray(
        updatedData.additionalInfo
      )
      const keys = [] as string[]

      additionalInfos.filter((additionalInfo) => {
        if (!keys.includes(additionalInfo.key)) {
          keys.push(additionalInfo.key)
          return true
        }

        return false
      })

      // updateInReact
      EventBus.emit(CheckoutEventBusEnum.UPDATE_CHECKOUT_DATA, [
        memoryId,
        updatedData
      ])
      return true
    },
    get(memoryId, state) {
      const states = {
        products: globalProducts
      }

      return states[state].get(memoryId)
    },
    addEvent(hookName, hookHandler) {
      console.log('> addEvent')

      const handlers = {
        beforeCreateCharge: (handler) => {
          if (hookHandler[Symbol.toStringTag] !== 'AsyncFunction') {
            return console.error('Only supported asynchronous function')
          }

          const nextFn = (calledHookName: string) =>
            globalHookIds.get(calledHookName) ?? ''
          const boundedHookHandler = hookHandler.bind(
            null,
            nextFn.bind(null, hookName),
            globalProducts
          )

          globalEventHooks.set(hookName, boundedHookHandler)
        }
      }

      if (!handlers[hookName]) {
        console.error('Hook not available')
        return false
      }

      if (hookHandler[Symbol.toStringTag] !== 'AsyncFunction') {
        console.error('Only asynchronous functions are supported')
        return false
      }

      handlers[hookName](hookHandler)
      return true
    }
  }
}
