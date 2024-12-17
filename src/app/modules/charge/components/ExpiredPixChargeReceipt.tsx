import { centsToBRL } from '@/common/centsToBRL'
import { OpenPixLogo } from '../../checkout/components/svgs/OpenPixLogo'
import { type Order, useCheckout } from '../../checkout/context/useCheckout'
import { cnpjMask } from '../../checkout/masks/cnpjMask'
import { additionalInfoMapper } from '../mapper/additionalInfoMapper'
import { hideCNPJMask } from '../masks/hideCNPJMask'
import { ClickPixIcon } from './svgs/ClickPixIcon'
import { WooviSvgLogoMuted } from './svgs/WooviSvgLogoMuted'
import { XSvgIcon } from './svgs/XSvgIcon'

export enum ExpiredPixChargeDetailEventBusEnum {
  OPEN_MODAL = 'openExpiredPixChargeDetailModal',
  CLOSE_MODAL = 'closeExpiredPixChargeDetailModal',
  UPDATE_VIEW_DATA = 'updateStateExpiredPixChargeDetailodal'
}

export const ExpiredPixChargeReceipt = ({ order }: { order: Order }) => {
  const { setCurrentModal, setSelectedProductId } = useCheckout()

  const closeModal = () => {
    setCurrentModal('')
    setSelectedProductId('')
  }

  return (
    <div className="modal w-full h-[100vh] fixed z-10" id="expiredPixChargeReceipt">
      <div className="w-full h-[100vh] bg-black opacity-50 absolute z-0"></div>
      <div className="modal-inner relative flex items-center justify-center h-[100vh]">
        <div className="modal-content flex flex-col items-center justify-center  w-[480px] max-h-[820px] rounded-lg bg-white">
          <div className="modal-header flex justify-between items-center p-4 w-full">
            <ClickPixIcon />

            <button
              onClick={closeModal}
              className="modal-close bg-transparent outline-none border-none"
              type="button"
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

            <div className="mx-auto flex flex-col items-center"></div>

            <div className="mx-auto flex flex-col items-center gap-2 mt-4">
              <OpenPixLogo />

              <XSvgIcon />

              <h4 className="text-2xl font-bold text-align mt-2">
                Cobrança expirada
              </h4>

              <p className="text-lg text-zinc-500 font-medium">
                O prazo para pagamento dessa cobrança expirou.
              </p>

              <div className="max-w-[360px] flex flex-col justify-center items-center gap-5">
                <div className="w-fit mx-auto">
                  <h4 className="font-bold text-base text-center">
                    Valor pago
                  </h4>
                  <p className="text-base text-center">
                    {centsToBRL(order.value)}
                  </p>
                </div>

                <div className="w-fit mx-auto">
                  <h4 className="font-bold text-base text-center">
                    Método de pagamento
                  </h4>
                  <p className="text-base text-center">{order.paymentMethod}</p>
                </div>

                <div className="w-fit mx-auto flex flex-col gap-2">
                  <h4 className="font-bold text-base text-center">
                    Detalhes da transação
                  </h4>

                  <div className="flex flex-col items-center justify-center">
                    <h4 className="font-bold text-base text-center">
                      Destinatário
                    </h4>

                    <p className="text-base text-center">
                      {order.companyNameFriendly}
                    </p>

                    {order.companyTaxID && (
                      <p className="text-base text-center">
                        CNPJ: {hideCNPJMask(cnpjMask(order.companyTaxID))}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <h4 className="font-bold text-base text-center">
                      Identificador
                    </h4>

                    <p className="text-base text-center">{order.identifier}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <h4 className="font-bold text-base text-center">
                      ID da Transação
                    </h4>
                    <p className="text-base text-center">
                      {order.transactionID}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <h5 className="font-bold text-base text-center">
                      Informações Adicionais
                    </h5>

                    {Array.from(
                      additionalInfoMapper.toArray(order.additionalInfo),
                      (additionalInfo) => {
                        return (
                          <div
                            key={additionalInfo.value}
                            className="flex flex-col items-center justify-center"
                          >
                            <strong>{additionalInfo.key}</strong>
                            <span>{additionalInfo.value}</span>
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>
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
