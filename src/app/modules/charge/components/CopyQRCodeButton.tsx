import { useState } from 'react'
import { CopyIcon } from './svgs/CopyIcon'
import { CircleOkSvgIcon } from './svgs/CricleOkSvgIcon'

export const CopyQRCodeButton = ({ brCode }: { brCode: string }) => {
  const [copied, setCopied] = useState(false)

  return (
    <button
      className="flex items-center justify-center gap-2 w-full bg-[#133A6f] text-center py-3 text-white text-md rounded-md uppercase"
      onClick={() => {
        window.navigator.clipboard.writeText(brCode)

        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 500)
      }}
    >
      {!copied && <CopyIcon />}
      {!copied && 'Copiar código QR Code'}

      {copied && <CircleOkSvgIcon />}
      {copied && 'Copiado!'}
    </button>
  )
}
