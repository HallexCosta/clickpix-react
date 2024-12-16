import { createRoot } from 'react-dom/client'

import './index.css'

import { $initializeOpenpixSDK } from '@sdk/$openpixSDK'
import { App } from './App'
import { CheckoutProvider } from './app/modules/checkout/context/CheckoutProvider'

let rootEl = document.getElementById('root')

if (!rootEl) {
  const root = document.createElement('div')
  root.setAttribute('id', 'root')
  document.body.prepend(root)
}

rootEl = document.getElementById('root')

if (rootEl) {
  const root = createRoot(rootEl)
  root.render(
    <CheckoutProvider>
      <App />
    </CheckoutProvider>
  )
}

$initializeOpenpixSDK()
