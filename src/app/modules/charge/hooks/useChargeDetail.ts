import { type MutableRefObject, useRef } from 'react'

export const useChargeDetail = () => {
  const chargeDetailRef = useRef<HTMLDivElement>(null)

  const closeChargeDetailModal = (
    chargeDetailRef: MutableRefObject<HTMLDivElement | null>
  ) => {
    if (!chargeDetailRef.current) {
      return console.log('chargeDetailRef cannot be null or undefined')
    }

    chargeDetailRef.current.classList.add('hidden')
  }

  const openChargeDetailModal = (
    chargeDetailRef: MutableRefObject<HTMLDivElement | null>
  ) => {
    if (!chargeDetailRef.current) {
      return console.log('chargeDetailRef cannot be null or undefined')
    }

    chargeDetailRef.current.classList.remove('hidden')
  }

  return {
    closeChargeDetailModal,
    openChargeDetailModal,
    chargeDetailRef
  }
}
