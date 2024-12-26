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
import { validateImuttableProperties } from './core/validations/validateImmutableProperties'

export const $initializeOpenpixSDK = () => {
  // openpix settings
  window.$openpix = window.$openpix || []

  // Export SDK for external usage
  const availableStates = ['products']

  window.$openpixSDK = {
    updateIn(memoryId: string | number, state: string, updatedOrder: Order) {
      console.log('> updateIn', memoryId, state, updatedOrder)
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

      const oldOrder = memory.get(memoryId)
      if (!validateImuttableProperties.canMutate(oldOrder, updatedOrder)) {
        return false
      }

      const additionalInfos = additionalInfoMapper.toArray(
        updatedOrder.additionalInfo
      )
      const keys = [] as string[]

      const newAdditionalInfos = additionalInfos.filter((additionalInfo) => {
        if (!keys.includes(additionalInfo.key)) {
          keys.push(additionalInfo.key)
          return true
        }

        return false
      })
      updatedOrder.additionalInfo =
        additionalInfoMapper.toString(newAdditionalInfos)

      // updateInReact
      EventBus.emit(CheckoutEventBusEnum.UPDATE_CHECKOUT_DATA, [
        memoryId,
        updatedOrder
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
