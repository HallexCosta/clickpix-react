import type { Order } from '../checkout/context/useCheckout'

export enum CheckoutEventBusEnum {
  UPDATE_CHECKOUT_DATA = 'updateCheckoutData',
  CLOSE_CHECKOUT_MODAL = 'closeCheckoutModal',
  OPEN_CHECKOUT_MODAL = 'openCheckoutModal'
}

type ListenerHandlerVoid = () => void
type ListenerUpdateCheckoutData = (productId: string, data: Order) => void
type ListenerOpenCheckoutModal = (productId: string) => void

type CheckoutListenerHandlers =
  | ListenerHandlerVoid
  | ListenerOpenCheckoutModal
  | ListenerUpdateCheckoutData

type ChargeListeenrHandlers = () => void

type EventMap = {
  event1: [string, number]
  event2: [boolean]
  event3: [string, boolean]
  any: any
}

export const EventBus = {
  listeners: new Map<string, CheckoutListenerHandlers>(),
  emit<T extends keyof EventMap>(eventName, args?: EventMap[T]) {
    if (!this.listeners.has(eventName))
      return console.log('no has listener with', eventName)

    const listener = this.listeners.get(eventName)!

    console.log({ listener })

    if (!args) return listener()

    return listener(...args)
  },
  subscribe(eventName, listener) {
    this.listeners.set(eventName, listener)
    return () => this.listeners.delete(eventName)
  }
}
