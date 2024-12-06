import { useState } from 'react'
// import { reactMemoryAdapter } from '../../openpix-plugin/adapters/reactMemoryAdapter'
import type { Order } from '../../checkout/context/useCheckout'

export const globalProducts = new Map()

export const useProducts = () => {
  // console.log('useProducts', { reactMemoryAdapter })
  const [products, setProducts] = useState<Map<string, Order>>(globalProducts)

  // if (!reactMemoryAdapter.states) {
  //   reactMemoryAdapter.setStates({ products })
  // }

  const updateProduct = (
    productId: string | number,
    data: Record<string, any>
  ) => {
    return products.set(String(productId), data)
  }
  const getProduct = (productId: string | number) => {
    return products.get(String(productId))
  }
  // window.$openpixSDK.add()

  // window.reactLayer.addProduct = addProduct
  // window.reactLayer.getProduct = getProduct

  return [getProduct, updateProduct, products] as const
}
