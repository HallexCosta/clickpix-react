import { QRCodeSVG } from 'qrcode.react'
import { type MutableRefObject, useEffect, useRef, useState } from 'react'
import { centsToBRL } from '../../../../common/centsToBRL'
import { type Order, useCheckout } from '../../checkout/context/useCheckout'
import { EventBus } from '../../event-bus/EventBus'
import { ClickPixIcon } from './svgs/ClickPixIcon'
import { ClockSvgIcon } from './svgs/ClockSvgIcon'
import { CopyIcon } from './svgs/CopyIcon'
import { OrderSvgIcon } from './svgs/OrderSvgIcon'
import { SharedSvgIcon } from './svgs/SharedSvgIcon'
import { WooviSvgLogo } from './svgs/WooviSvgLogo'
import { WooviSvgLogoMuted } from './svgs/WooviSvgLogoMuted'

export enum ChargeDetailByCorrelationIDEventBusEnum {
  OPEN_CHARGE_MODAL = 'updateCheckoutData',
  CLOSE_CHARGE_MODAL = 'closeCheckoutModal',
  UPDATE_CHARGE_DETAIL = 'updateChargeDetail'
}

export const openChargeDetailModal = (
  chargeDetailRef: MutableRefObject<HTMLDivElement | null>
) => {
  if (!chargeDetailRef.current) return

  chargeDetailRef.current.classList.remove('hidden')
}

export const closeChargeDetailModal = (
  chargeDetailRef: MutableRefObject<HTMLDivElement | null>
) => {
  if (!chargeDetailRef.current) return

  chargeDetailRef.current.classList.add('hidden')
}

export const ChargeDetailByCorrelationID = ({ productId }) => {
  const chargeDetailRef = useRef<HTMLDivElement>(null)

  const { getProduct } = useCheckout()
  const [data, setData] = useState<Order | null>(getProduct(productId))

  const updateChargeDetail = (data: Order) => {
    setData((prev: Order) => ({
      ...prev,
      ...data
    }))
  }

  useEffect(() => {
    EventBus.subscribe(
      ChargeDetailByCorrelationIDEventBusEnum.OPEN_CHARGE_MODAL,
      () => openChargeDetailModal(chargeDetailRef)
    )
    EventBus.subscribe(
      ChargeDetailByCorrelationIDEventBusEnum.OPEN_CHARGE_MODAL,
      () => closeChargeDetailModal(chargeDetailRef)
    )

    EventBus.subscribe(
      ChargeDetailByCorrelationIDEventBusEnum.UPDATE_CHARGE_DETAIL,
      updateChargeDetail
    )
  }, [])

  return (
    <div
      className="modal w-full h-[100vh] absolute"
      id="charge-render"
      data-product-id={productId}
      ref={chargeDetailRef}
    >
      <div className="w-full h-[100vh] bg-black opacity-50 absolute z-0"></div>
      <div className="modal-inner relative flex items-center justify-center h-[100vh]">
        <div className="modal-content flex flex-col items-center justify-center  w-[480px] max-h-[820px] border border-red-500 rounded-lg">
          <div className="modal-header flex justify-between items-center p-4 w-full bg-white">
            <ClickPixIcon />
            <button
              // onClick={() => closeChargeDetailModal(chargeDetailRef)}
              className="modal-close bg-transparent outline-none border-none"
              type="button"
              onClick={() => closeChargeDetailModal(chargeDetailRef)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="rgba(0, 0, 0, 0.54)"
                  d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
                />
              </svg>
            </button>
          </div>

          <div className="bg-zinc-100 h-0.5 w-full text-black border-none border-0 outline-none" />

          <div className="w-full bg-white overflow-auto">
            {/* <div className="w-1/6"></div> */}
            <div className="mx-auto flex flex-col items-center gap-6 mt-4">
              <WooviSvgLogo />

              <h4 className="text-xl font-bold text-align">
                Pague {centsToBRL(data?.value ?? 200)} para Teste via Pix
              </h4>

              <div className="max-w-[360px] flex flex-col gap-5">
                <div className="w-fit mx-auto border border-[#03d69d] rounded-lg shadow-[0_0_0_3px_rgb(179,242,225)] p-4">
                  <QRCodeSVG
                    width={276}
                    height={276}
                    value="000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA"
                  />
                </div>

                <p className="mx auto 1/2 text-muted text-tiny text-center">
                  Abra o app do seu banco, escaneie a imagem ou cole o código QR
                  Code
                </p>

                <div className="flex flex-col gap-1.5">
                  <button className="flex items-center justify-center gap-2 w-full bg-[#133A6f] text-center py-3 text-white text-md rounded-md uppercase">
                    <CopyIcon /> Copiar código QR Code
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full text-[#133A6f] text-center py-3 text-md rounded-md uppercase border border-[#133A6f]">
                    <SharedSvgIcon /> Compartilhar cobrança
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full text-[#133A6f] text-center py-3 text-md rounded-md uppercase border border-[#133A6f]">
                    <OrderSvgIcon /> Baixar Fatura Pix
                  </button>
                </div>
              </div>

              <div className="md:max-w-[360px] flex flex-col justify-center items-center gap-1.5">
                <h3 className="text-lg text-black font-bold">
                  Prazo de Pagamento
                </h3>

                <div className="flex gap-2">
                  <ClockSvgIcon />
                  <span className="text-lg text-zinc-400">24h 04m 02s</span>
                </div>
                <h2 className="text-lg text-black font-bold ">
                  Detalhes da transação
                </h2>
                <h4 className="text-sm text-black font-bold">Destinárario</h4>
                <p className="text-sm text-zinc-400">Woovi Demo</p>
                <p className="text-sm text-zinc-400">
                  CNPJ: 44.72*.***/0001-01
                </p>
                <h4 className="text-sm text-black font-bold">Identificador</h4>
                <p className="text-sm text-zinc-400">
                  0112c28128654da49f6e9e599bcfe171
                </p>
              </div>

              <div className="md:max-w-[360px] flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-2 text-zinc-300 text-sm">
                  Pagamento 100% criptografado via
                  <WooviSvgLogoMuted />
                </div>

                <p className="text-zinc-300 text-sm mt-1.5 mb-8">(v5.2.72)</p>
              </div>
            </div>
            {/* <div className="w-1/6"></div> */}
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
