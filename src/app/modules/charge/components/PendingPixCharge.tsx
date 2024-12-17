import { QRCodeSVG } from 'qrcode.react'
import {
  type MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { centsToBRL } from '../../../../common/centsToBRL'
import { PixChargeEnvironmentBanner } from '../../checkout/components/PixChargeEnvironmentBanner'
import { type Order, useCheckout } from '../../checkout/context/useCheckout'
import { cnpjMask } from '../../checkout/masks/cnpjMask'
import { CheckoutEventBusEnum, EventBus } from '../../event-bus/EventBus'
import { globalProducts } from '../../products/hooks/useProducts'
import { additionalInfoMapper } from '../mapper/additionalInfoMapper'
import { hideCNPJMask } from '../masks/hideCNPJMask'
import { fetchPixChargeQuery } from '../services/fetchPixChargeQuery'
import { fetchSyncChargeUpdateStatus } from '../services/fetchSyncChargeUpdate'
import { CopyQRCodeButton } from './CopyQRCodeButton'
import { ExpiredPixChargeDetailEventBusEnum } from './ExpiredPixChargeReceipt'
import { ClickPixIcon } from './svgs/ClickPixIcon'
import { ClockSvgIcon } from './svgs/ClockSvgIcon'
import { OrderSvgIcon } from './svgs/OrderSvgIcon'
import { SharedSvgIcon } from './svgs/SharedSvgIcon'
import { WooviSvgLogo } from './svgs/WooviSvgLogo'
import { WooviSvgLogoMuted } from './svgs/WooviSvgLogoMuted'

export enum ChargeDetailByCorrelationIDEventBusEnum {
  OPEN_CHARGE_MODAL = 'openChargeDetailByCorrelationID',
  CLOSE_CHARGE_MODAL = 'closeChargeDetailByCorrelationID',
  UPDATE_CHARGE_DETAIL = 'updateStateChargeDetail'
}

export const openChargeDetailModal = (
  chargeDetailRef: MutableRefObject<HTMLDivElement | null>
) => {
  console.log('openChargeDetailModal', chargeDetailRef)
  if (!chargeDetailRef.current) return

  chargeDetailRef.current.classList.remove('hidden')
}

const getChargeExpirationTimeText = (expirationTime: Date) => {
  const now = new Date()
  const diffInMs = expirationTime.getTime() - now.getTime()

  if (diffInMs <= 0) {
    return 'EXPIRED'
  }

  const totalSeconds = Math.floor(diffInMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${hours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
}

export const PendingPixCharge = ({ order }: { order: Order }) => {
  const {
    selectedProductId,
    setSelectedProductId,
    setCurrentModal,
    updateCheckoutData,
    getProduct
  } = useCheckout()
  const [updateExpirationTimeTimeoutId, setUpdateExpirationTimeTimeoutId] =
    useState(0)
  const chargeDetailRef = useRef<HTMLDivElement>(null)
  const updateExpirationTimeTimeoutIdRef = useRef<number>(0)
  const fetchSyncChargeUpdateStatusRef = useRef<number>(0)

  const [expirationTimeText, setExpirationTimeText] = useState(
    getChargeExpirationTimeText(order.expiresDate)
  )
  // const [viewOrder, setViewOrder] = useState<Order>({
  //   additionalInfo: 'orderId:some-id-123,chargeType:clickpix,product:123',
  //   paymentMethod: 'PIX',
  //   paymentStatus: 'ACTIVE',
  //   value: 900,
  //   // expiresIn: 86400,
  //   companyNameFriendly: 'Teste',
  //   identifier: '30ad1dd5e76348f3b95eb74dc1e9690d',
  //   companyTaxID: '57687963000122',
  //   transactionID: 'E196d764143454da08433781a5c753581',
  //   paymentLinkUrl:
  //     'https://openpix.com.br/pay/d82499d1-ea74-4e77-9b3b-5ffcd96d7477',
  //   expiresDate: new Date('2024-12-14T16:33:50.221Z'),
  //   createdAt: new Date('2024-12-13T15:55:38.234Z'),
  //   brCode:
  //     '00020101021226950014br.gov.bcb.pix2573api.openpix.com.br/api/testaccount/qr/v1/9ceda40960be4e17bfe470bd1c37ccaa52040000530398654040.015802BR5905Teste6009Sao_Paulo622905259ceda40960be4e17bfe470bd16304481B'
  // } as Order)

  const closeModal = () => {
    setSelectedProductId('')
    setCurrentModal('')
  }

  const updateExpirationTime = useCallback((currentOrder: Order) => {
    const updateExpirationTimeTimeoutId = setTimeout(() => {
      const timer = getChargeExpirationTimeText(currentOrder.expiresDate)

      const order = getProduct(currentOrder?.productId)
      if (!order) return console.error('updateExpirationTime: order is empty')

      if (timer === 'EXPIRED') {
        updateCheckoutData(order.productId, {
          ...order,
          paymentStatus: 'EXPIRED'
        })
        setCurrentModal('expired')
        clearTimeout(updateExpirationTimeTimeoutId)
        return
      }

      setExpirationTimeText(timer)

      return updateExpirationTime(order)
    }, 1000)

    updateExpirationTimeTimeoutIdRef.current = updateExpirationTimeTimeoutId
  }, [])

  useEffect(() => {
    updateExpirationTime(order)
    fetchSyncChargeUpdateStatus(order, fetchSyncChargeUpdateStatusRef)

    return () => {
      console.log(
        'leaving PendingPixCharge',
        updateExpirationTimeTimeoutIdRef.current
      )
      clearTimeout(updateExpirationTimeTimeoutIdRef.current)
      clearTimeout(fetchSyncChargeUpdateStatusRef.current)
    }
  }, [])

  return (
    <div
      className="modal w-full h-[100vh] fixed z-10 font-sans"
      id="pendingChargePixDetail"
      data-product-id={order.productId}
      ref={chargeDetailRef}
    >
      <div className="w-full h-[100vh] bg-black opacity-50 absolute z-0"></div>
      <div className="modal-inner relative flex items-center justify-center h-[100vh]">
        <div className="modal-content flex flex-col items-center justify-center w-[480px] max-h-[820px] bg-white rounded-lg">
          <div className="modal-header flex justify-between items-center p-4 w-full">
            <ClickPixIcon />
            <button
              // onClick={() => closeChargeDetailModal(chargeDetailRef)}
              className="modal-close bg-transparent outline-none border-none"
              type="button"
              onClick={closeModal}
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

          <div
            className="
              modal-body
              w-full overflow-auto
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-width]:thin
            [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-track]:rounded-lg
            [&::-webkit-scrollbar-thumb]:bg-neutral-400
              [&::-webkit-scrollbar-thumb]:rounded-lg
            "
          >
            {/* <div className="w-1/6"></div> */}
            <div className="mx-auto flex flex-col items-center gap-6 mt-4">
              {order.isFromTestAccount && (
                <div className="mx-auto w-[320px] flex items-center justify-center">
                  <PixChargeEnvironmentBanner />
                </div>
              )}

              <WooviSvgLogo />

              <h4 className="text-xl font-bold text-align">
                Pague {centsToBRL(order.value)} para Teste via Pix
              </h4>

              <div className="max-w-[360px] flex flex-col gap-5">
                <div className="w-fit mx-auto border border-[#03d69d] rounded-lg shadow-[0_0_0_3px_rgb(179,242,225)] p-4">
                  {order && (
                    <QRCodeSVG width={276} height={276} value={order.brCode} />
                  )}
                </div>

                <p className="mx auto 1/2 text-muted text-tiny text-center">
                  Abra o app do seu banco, escaneie a imagem ou cole o código QR
                  Code
                </p>

                <div className="flex flex-col gap-1.5">
                  {order && <CopyQRCodeButton brCode={order.brCode} />}
                  {order && (
                    <button
                      className="flex items-center justify-center gap-2 w-full text-[#133A6f] text-center py-3 text-md rounded-md uppercase border border-[#133A6f]"
                      onClick={() => {
                        const phone = '+5518997887240'
                        const text = `Pague para Teste através da OpenPix. ${order.paymentLinkUrl}`
                        window.open(
                          `https://api.whatsapp.com/send?phone=${phone}&text=${text}`,
                          '_blank'
                        )
                      }}
                    >
                      <SharedSvgIcon /> Compartilhar cobrança
                    </button>
                  )}
                  <button
                    disabled
                    className="
                      flex items-center justify-center gap-2 w-full text-[#133A6f] text-center py-3 text-md rounded-md uppercase border border-[#133A6f]
                      disabled:border-zinc-400 disabled:text-zinc-300
                    "
                  >
                    <OrderSvgIcon disabled /> Baixar Fatura Pix
                  </button>
                </div>
              </div>

              <div className="md:max-w-[360px] flex flex-col justify-center items-center gap-1.5">
                <h3 className="text-lg text-black font-bold">
                  Prazo de Pagamento
                </h3>

                <div className="flex gap-2">
                  <ClockSvgIcon />
                  <span className="text-lg text-zinc-400">
                    {expirationTimeText}
                  </span>
                </div>
                <h2 className="text-lg text-black font-bold ">
                  Detalhes da transação
                </h2>
                <h4 className="text-sm text-black font-bold">Destinátario</h4>
                {order && (
                  <p className="text-sm text-zinc-400">
                    {order.companyNameFriendly}
                  </p>
                )}
                {order && (
                  <p className="text-sm text-zinc-400">
                    CNPJ: {hideCNPJMask(cnpjMask(order.companyTaxID))}
                  </p>
                )}
                <h4 className="text-sm text-black font-bold">Identificador</h4>
                {order && (
                  <p className="text-sm text-zinc-400">{order.identifier}</p>
                )}

                <h4 className="text-lg text-black font-bold">
                  Informações Adicionais
                </h4>
                {additionalInfoMapper
                  .toArray(order.additionalInfo)
                  .map((additionalInfo, index) => (
                    <div
                      key={`${additionalInfo.key}-${index}`}
                      className="flex flex-col items-center justify-center"
                    >
                      <strong className="text-sm text-black font-bold">
                        {additionalInfo.key}
                      </strong>
                      <span className="text-sm text-zinc-400">
                        {additionalInfo.value}
                      </span>
                    </div>
                  ))}
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
