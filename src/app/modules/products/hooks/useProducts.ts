import { useState } from 'react'
import type { Order } from '../../checkout/context/useCheckout'

export const globalProducts = new Map()

export const useProducts = () => {
  const [products, setProducts] = useState<Map<string, Order>>(globalProducts)

  const updateProduct = (productId: string | number, data: Order) => {
    return products.set(String(productId), data)
  }
  const getProduct = (productId: string | number): Order | null => {
    if (!products.has(String(productId))) {
      return null
    }

    return products.get(String(productId)) as Order
  }

  return [getProduct, updateProduct, products] as const
}
