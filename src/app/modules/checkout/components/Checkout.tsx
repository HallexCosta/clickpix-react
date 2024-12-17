import { unMaskValue } from '@/common/unMaskValue'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { Suspense, useContext, useEffect, useRef, useState } from 'react'
import {
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm
} from 'react-hook-form'
import { useRifm } from 'rifm'
import { z } from 'zod'
import { centsToBRL } from '../../../../common/centsToBRL'
import { combineHandlers } from '../../../../common/combineHandlers'
import { cx } from '../../../../common/cx'
import { additionalInfoMapper } from '../../charge/mapper/additionalInfoMapper'
import { fetchSyncPaymentLink } from '../../charge/services/fetchSyncPaymentLink'
import {
  CheckoutContext,
  type Order,
  useCheckout
} from '../context/useCheckout'
import { globalHookIds, useEventHooks } from '../hooks/useEventHooks'
import { phoneMask } from '../masks/phoneMask'
import { taxIDMask } from '../masks/taxIdMask'
import { DropdownDDI, TriggerDrowpdownDDI } from './DropdownDDI'
import { OpenPixLogo } from './svgs/OpenPixLogo'

import type { CreateAdditionalInfoResponse } from '@/app/providers/woovi/interfaces-types/external/response/CreateAdditionalInfoResponse'
import { createPixChargeRequest } from '@/app/providers/woovi/services/createPixChargeRequest'
import { generateCorrelationUniqueId } from '@/common/generateCorrelationUniqueId'
import { ChargeDetailByCorrelationIDEventBusEnum } from '../../charge/components/PendingPixCharge'
import { fetchPixChargeQuery } from '../../charge/services/fetchPixChargeQuery'
import { EventBus } from '../../event-bus/EventBus'
import { PixChargeEnvironmentBanner } from './PixChargeEnvironmentBanner'

const checkoutFormSchema = z.object({
  taxID: z
    .string()
    .min(14, {
      message: 'Minimo 14 dígitos (considerando pontuações)'
    })
    .max(18, {
      message: 'Máximo 18 dígitos (considerando pontuações)'
    })
    .regex(
      /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/,
      'O CPF ou CNPJ fornecido é inválido'
    ),
  name: z
    .string()
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/u,
      'Apenas letras, espaços e acentos são permitidos'
    ),
  email: z
    .string()
    .nonempty('Email é obrigatorio')
    // .email({ message: 'Email é invalido' })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email é invalido'),
  phone: z
    .string()
    .min(15, 'Minimo de 14 dígitos')
    .max(15, 'Máximo de 15 dígitos')
    .nonempty('Celular é obrigatorio')
})

export const Checkout = ({ order }: { order: Order }) => {
  const taxIDRef = useRef<HTMLInputElement>(null)

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(checkoutFormSchema)
  })
  const { ref: taxIDRefReactHookForm, ...restTaxIDRegister } = register('taxID')

  const [phoneText, setPhoneText] = useState('')
  const phoneRifm = useRifm({
    value: phoneText,
    onChange: setPhoneText,
    format: phoneMask
  })
  const [taxIDText, setTaxIDText] = useState('')
  const taxIDRifm = useRifm({
    value: taxIDText,
    onChange: setTaxIDText,
    format: taxIDMask
  })

  const [emailText, setEmailText] = useState('')
  // const watchEmail = watch('email')
  const watchFields = watch()
  const { hooks } = useEventHooks()
  const {
    requesting,
    setRequesting,
    currentOrder,
    selectedProductId,
    setSelectedProductId,
    updateCheckoutData,
    getProduct,
    checkoutRef,
    setCurrentModal
  } = useContext(CheckoutContext)

  React.useEffect(() => {
    if (taxIDRef.current) taxIDRef.current.focus()
  }, [])

  const closeModal = () => {
    setSelectedProductId('')
    setCurrentModal('')
  }

  const handlerHookBeforeCreateCharge = async (productId: string) => {
    setRequesting(true)
    console.log('> creteOrder')
    // hooks.

    const beforeCreateChargeFn = hooks.get('beforeCreateCharge')
    if (beforeCreateChargeFn) {
      const hookId = await beforeCreateChargeFn(productId)
      if (
        hookId !== globalHookIds.get('beforeCreateCharge') &&
        typeof globalHookIds.get('beforeCreateCharge') === 'string'
      ) {
        // enable continue button
        return false
      }
    }

    return true
  }

  const createCharge = async (productId: string) => {
    const order = getProduct(productId)

    if (!order) {
      return console.log(
        'order cannot be empty, null or undefined to create a new charge'
      )
    }

    const additionalInfo = additionalInfoMapper.toArray(order.additionalInfo)

    const correlationID = generateCorrelationUniqueId(30)
    const chargeBody = {
      value: Number(order.value),
      correlationID,
      customer: {
        name: order.payerName,
        email: order.payerEmail,
        taxID: unMaskValue.removeAllDigits(order.payerTaxID),
        phone: unMaskValue.removeAllDigits(order.payerPhone)
      },
      comment: order.comment,
      additionalInfo
    }

    // const chargeResponse = await chargeCreate(chargeBody)
    const createChargeResponse = await createPixChargeRequest(
      chargeBody,
      order.appid
    )

    if (createChargeResponse.error) {
      console.error(createChargeResponse.error)
    }

    const wooviChargeQuery = await fetchPixChargeQuery(
      chargeBody.correlationID,
      order.appid
    )

    const product = getProduct(productId)
    if (!product) {
      return console.error('create charge:', 'product not found', productId)
    }

    const newOrder: Order = {
      ...product,
      payerPhone: chargeBody.customer.phone,
      payerTaxID: chargeBody.customer.taxID,
      expiresIn: createChargeResponse.charge.expiresIn,
      paymentLinkUrl: createChargeResponse.charge.paymentLinkUrl,
      brCode: createChargeResponse.charge.brCode,
      identifier: createChargeResponse.charge.identifier,
      additionalInfo: additionalInfoMapper.toString(
        createChargeResponse.charge
          .additionalInfo as CreateAdditionalInfoResponse[]
      ),
      paymentMethod: 'PIX',
      correlationID,
      paymentStatus: createChargeResponse.charge.paymentMethods.pix.status,
      transactionID:
        createChargeResponse.charge.paymentMethods.pix.transactionID,
      companyTaxID: wooviChargeQuery.data.charge.company.taxID.taxID as string,
      companyNameFriendly: wooviChargeQuery.data.charge.company.nameFriendly,
      isFromTestAccount: wooviChargeQuery.data.charge
        .isFromTestAccount as boolean,
      expiresDate: new Date(wooviChargeQuery.data.charge.expiresDate),
      createdAt: new Date(wooviChargeQuery.data.charge.createdAt),
      status: 'CHARGE_EMITTED'
    }
    console.log({ productId, newOrder })
    updateCheckoutData(productId, newOrder)

    setSelectedProductId(productId)
    setCurrentModal('active')
    setRequesting(false)
  }

  const handleCreateOrder: SubmitHandler<
    z.infer<typeof checkoutFormSchema>
  > = async (data: z.infer<typeof checkoutFormSchema>) => {
    if (!checkoutRef.current) return console.log('Form not find in window')

    const productId = order.productId
    const currentOrder = getProduct(productId)
    if (!currentOrder) {
      return console.log('current order not found', {
        productId
      })
    }

    if (currentOrder.status === 'CHARGE_EMITTED') {
      setCurrentModal('active')
      return
    }

    const newOrder: Order = {
      ...currentOrder,
      payerTaxID: data.taxID,
      payerName: data.name,
      payerEmail: data.email,
      payerPhone: data.phone
    }
    updateCheckoutData(productId, newOrder)
    const success = await handlerHookBeforeCreateCharge(productId)
    if (!success) {
      console.error('abort create charge event')
      return
    }
    await createCharge(productId)
  }

  const handleInputInvalidCreateOrder: SubmitErrorHandler<
    z.infer<typeof checkoutFormSchema>
  > = (errors) => {
    console.log({ errors })
  }

  return (
    <div
      id="checkout"
      ref={checkoutRef}
      className="w-full h-full rounded-md mx-auto flex items-center justify-center fixed"
      onKeyUp={(e) => {
        e.key.toLocaleLowerCase() === 'escape' ? closeModal() : () => {}
      }}
      tabIndex={-1}
    >
      <div className="bg-black opacity-20 w-full border-red-500 h-full absolute z-10"></div>

      <div className="w-[480px] max-h-[680px] rounded-md bg-white z-20 relative">
        {/* Header */}
        <div className="flex justify-between p-4">
          <svg
            width="71.66666666666667"
            height="20"
            viewBox="0 0 86 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.35259 21.9167C8.39041 21.9167 7.57361 21.3352 7.21926 20.5146L6.59357 19.0654L5.51893 20.1403C4.61084 21.0487 3.14104 21.0487 2.23292 20.1403C1.32484 19.232 1.3248 17.7617 2.23292 16.8534L3.30756 15.7784L1.85875 15.1526C1.03904 14.7984 0.457031 13.9818 0.457031 13.0187C0.457031 11.9252 1.20827 11.0158 2.21557 10.764L10.9782 8.57265C11.7662 8.37555 12.6123 8.6098 13.1863 9.18388C13.7602 9.75796 13.9943 10.6042 13.7973 11.3925L11.6066 20.1577C11.3553 21.1635 10.448 21.9167 9.35259 21.9167ZM6.85238 16.9361C6.90074 16.9361 6.94938 16.9406 6.99779 16.9499C7.24986 16.9981 7.46169 17.168 7.56342 17.4037L8.64132 19.9003C8.75788 20.1702 9.02908 20.3673 9.35256 20.3673C9.72285 20.3673 10.0217 20.1104 10.1038 19.7819L12.2945 11.0168C12.3613 10.7495 12.2851 10.4739 12.0909 10.2796C11.8966 10.0853 11.6211 10.0091 11.3539 10.0759L2.59125 12.2672C2.26278 12.3494 2.00607 12.6483 2.00607 13.0187C2.00607 13.343 2.20376 13.6138 2.47294 13.7301L4.96879 14.8083C5.20436 14.9101 5.37429 15.122 5.42246 15.3741C5.47064 15.6262 5.39086 15.8858 5.20939 16.0674L3.32824 17.9491C3.02552 18.2519 3.02552 18.7419 3.32824 19.0447C3.63096 19.3475 4.12089 19.3475 4.42357 19.0447L6.30471 17.163C6.45133 17.0164 6.64895 16.9361 6.85238 16.9361Z"
              fill="rgba(0, 0, 0, 0.87)"
            ></path>
            <path
              d="M19.5159 10.9737H16.4178C15.99 10.9737 15.6433 10.6269 15.6433 10.199C15.6433 9.77109 15.99 9.42424 16.4178 9.42424H19.5159C19.9436 9.42424 20.2904 9.77109 20.2904 10.199C20.2904 10.6269 19.9436 10.9737 19.5159 10.9737Z"
              fill="rgba(0, 0, 0, 0.87)"
            ></path>
            <path
              d="M16.6996 16.2251L14.509 14.0338C14.2065 13.7312 14.2065 13.2407 14.509 12.9382C14.8115 12.6356 15.3019 12.6356 15.6043 12.9382L17.795 15.1294C18.0974 15.432 18.0974 15.9225 17.795 16.2251C17.4925 16.5276 17.0021 16.5276 16.6996 16.2251Z"
              fill="rgba(0, 0, 0, 0.87)"
            ></path>
            <path
              d="M8.29224 7.86643L6.10155 5.67515C5.79906 5.37258 5.79906 4.88205 6.10155 4.57952C6.40404 4.27698 6.89442 4.27694 7.19687 4.57952L9.38756 6.77079C9.69004 7.07337 9.69004 7.56389 9.38756 7.86643C9.08507 8.16897 8.59468 8.16897 8.29224 7.86643Z"
              fill="rgba(0, 0, 0, 0.87)"
            ></path>
            <path
              d="M12.1258 6.73182C11.698 6.73182 11.3513 6.38497 11.3513 5.95708V2.85811C11.3513 2.43023 11.698 2.08337 12.1258 2.08337C12.5536 2.08337 12.9003 2.43023 12.9003 2.85811V5.95708C12.9003 6.38497 12.5536 6.73182 12.1258 6.73182Z"
              fill="rgba(0, 0, 0, 0.87)"
            ></path>
            <path
              d="M14.8642 7.86643C14.5617 7.56385 14.5617 7.07332 14.8642 6.77079L17.0548 4.57951C17.3573 4.27694 17.8477 4.27694 18.1502 4.57951C18.4526 4.88209 18.4527 5.37261 18.1502 5.67515L15.9595 7.86643C15.6571 8.16896 15.1667 8.16896 14.8642 7.86643Z"
              fill="rgba(0, 0, 0, 0.87)"
            ></path>
            <path
              d="M29.525 18.1939C28.585 18.1939 27.7624 18.0118 27.0574 17.6475C26.3641 17.2715 25.8294 16.7427 25.4534 16.0611C25.0773 15.3796 24.8893 14.5746 24.8893 13.6463C24.8893 12.953 24.9951 12.3302 25.2066 11.778C25.4181 11.2257 25.7236 10.7556 26.1232 10.3679C26.5344 9.98008 27.028 9.68631 27.6038 9.48654C28.1796 9.27503 28.82 9.16927 29.525 9.16927C29.8893 9.16927 30.2771 9.21628 30.6884 9.31028C31.0996 9.39254 31.505 9.53942 31.9046 9.75094C32.1396 9.85669 32.2982 10.0095 32.3805 10.2092C32.4745 10.3972 32.5097 10.597 32.4862 10.8085C32.4627 11.0083 32.3863 11.1904 32.2571 11.3549C32.1396 11.5077 31.9868 11.6134 31.7988 11.6722C31.6108 11.7192 31.3993 11.6839 31.1643 11.5664C30.941 11.4372 30.706 11.3432 30.4592 11.2844C30.2242 11.2257 30.0009 11.1963 29.7894 11.1963C29.4369 11.1963 29.1255 11.255 28.8552 11.3725C28.585 11.4783 28.3558 11.6369 28.1678 11.8485C27.9915 12.0482 27.8505 12.3009 27.7448 12.6064C27.6508 12.9119 27.6038 13.2644 27.6038 13.664C27.6038 14.4395 27.7918 15.0505 28.1678 15.4971C28.5556 15.9319 29.0961 16.1492 29.7894 16.1492C30.0009 16.1492 30.2242 16.1257 30.4592 16.0787C30.6942 16.02 30.9292 15.926 31.1643 15.7967C31.3993 15.6792 31.6108 15.6498 31.7988 15.7086C31.9868 15.7673 32.1337 15.879 32.2395 16.0435C32.357 16.1963 32.4216 16.3784 32.4333 16.5899C32.4568 16.7897 32.4216 16.9894 32.3276 17.1892C32.2453 17.3772 32.0926 17.5241 31.8693 17.6298C31.4698 17.8296 31.0703 17.9706 30.6707 18.0529C30.2712 18.1469 29.8893 18.1939 29.525 18.1939ZM36.8494 18.1939C35.8036 18.1939 35.0221 17.906 34.5051 17.3302C33.9881 16.7427 33.7296 15.8731 33.7296 14.7215V6.77211C33.7296 6.32558 33.8412 5.99068 34.0645 5.76742C34.2995 5.5324 34.6344 5.41489 35.0692 5.41489C35.4922 5.41489 35.8153 5.5324 36.0386 5.76742C36.2736 5.99068 36.3911 6.32558 36.3911 6.77211V14.6158C36.3911 15.0976 36.491 15.456 36.6908 15.691C36.9023 15.9142 37.1784 16.0259 37.5192 16.0259C37.6132 16.0259 37.7013 16.02 37.7836 16.0082C37.8658 15.9965 37.954 15.9906 38.048 15.9906C38.236 15.9671 38.3653 16.0259 38.4358 16.1669C38.518 16.2961 38.5591 16.5605 38.5591 16.9601C38.5591 17.3126 38.4886 17.5828 38.3476 17.7709C38.2066 17.9471 37.9892 18.0646 37.6955 18.1234C37.5779 18.1351 37.4428 18.1469 37.2901 18.1586C37.1373 18.1821 36.9904 18.1939 36.8494 18.1939ZM40.9388 18.141C40.504 18.141 40.1691 18.0176 39.9341 17.7709C39.7109 17.5123 39.5992 17.1539 39.5992 16.6957V10.6675C39.5992 10.1975 39.7109 9.83907 39.9341 9.5923C40.1691 9.33378 40.504 9.20453 40.9388 9.20453C41.3618 9.20453 41.685 9.33378 41.9083 9.5923C42.1433 9.83907 42.2608 10.1975 42.2608 10.6675V16.6957C42.2608 17.1539 42.1491 17.5123 41.9259 17.7709C41.7026 18.0176 41.3736 18.141 40.9388 18.141ZM40.9388 7.75918C40.4453 7.75918 40.0634 7.64754 39.7931 7.42428C39.5346 7.18926 39.4053 6.86024 39.4053 6.43721C39.4053 6.00243 39.5346 5.67341 39.7931 5.45014C40.0634 5.21513 40.4453 5.09762 40.9388 5.09762C41.4323 5.09762 41.8084 5.21513 42.0669 5.45014C42.3254 5.67341 42.4547 6.00243 42.4547 6.43721C42.4547 6.86024 42.3254 7.18926 42.0669 7.42428C41.8084 7.64754 41.4323 7.75918 40.9388 7.75918ZM48.5283 18.1939C47.5882 18.1939 46.7656 18.0118 46.0606 17.6475C45.3673 17.2715 44.8326 16.7427 44.4566 16.0611C44.0806 15.3796 43.8926 14.5746 43.8926 13.6463C43.8926 12.953 43.9983 12.3302 44.2098 11.778C44.4214 11.2257 44.7269 10.7556 45.1264 10.3679C45.5377 9.98008 46.0312 9.68631 46.607 9.48654C47.1828 9.27503 47.8232 9.16927 48.5283 9.16927C48.8925 9.16927 49.2803 9.21628 49.6916 9.31028C50.1029 9.39254 50.5083 9.53942 50.9078 9.75094C51.1428 9.85669 51.3015 10.0095 51.3837 10.2092C51.4777 10.3972 51.513 10.597 51.4895 10.8085C51.466 11.0083 51.3896 11.1904 51.2603 11.3549C51.1428 11.5077 50.9901 11.6134 50.802 11.6722C50.614 11.7192 50.4025 11.6839 50.1675 11.5664C49.9442 11.4372 49.7092 11.3432 49.4625 11.2844C49.2274 11.2257 49.0042 11.1963 48.7927 11.1963C48.4401 11.1963 48.1287 11.255 47.8585 11.3725C47.5882 11.4783 47.3591 11.6369 47.1711 11.8485C46.9948 12.0482 46.8538 12.3009 46.748 12.6064C46.654 12.9119 46.607 13.2644 46.607 13.664C46.607 14.4395 46.795 15.0505 47.1711 15.4971C47.5588 15.9319 48.0994 16.1492 48.7927 16.1492C49.0042 16.1492 49.2274 16.1257 49.4625 16.0787C49.6975 16.02 49.9325 15.926 50.1675 15.7967C50.4025 15.6792 50.614 15.6498 50.802 15.7086C50.9901 15.7673 51.1369 15.879 51.2427 16.0435C51.3602 16.1963 51.4248 16.3784 51.4366 16.5899C51.4601 16.7897 51.4248 16.9894 51.3308 17.1892C51.2486 17.3772 51.0958 17.5241 50.8726 17.6298C50.473 17.8296 50.0735 17.9706 49.674 18.0529C49.2744 18.1469 48.8925 18.1939 48.5283 18.1939ZM54.0724 18.1586C53.6376 18.1586 53.3027 18.0411 53.0677 17.8061C52.8444 17.5711 52.7328 17.2362 52.7328 16.8014V6.77211C52.7328 6.32558 52.8444 5.99068 53.0677 5.76742C53.3027 5.5324 53.6376 5.41489 54.0724 5.41489C54.4954 5.41489 54.8186 5.5324 55.0418 5.76742C55.2769 5.99068 55.3944 6.32558 55.3944 6.77211V12.9237H55.4296L57.9854 10.0858C58.2439 9.79206 58.4789 9.57468 58.6905 9.43367C58.9137 9.28091 59.2075 9.20453 59.5718 9.20453C59.936 9.20453 60.2122 9.29853 60.4002 9.48654C60.6 9.67456 60.6999 9.9037 60.6999 10.174C60.7116 10.4325 60.6 10.6969 60.365 10.9671L57.6681 13.9812V12.9765L60.6646 16.4313C60.8879 16.7015 60.9819 16.9718 60.9466 17.2421C60.9231 17.5123 60.8056 17.7356 60.5941 17.9119C60.3826 18.0764 60.1123 18.1586 59.7833 18.1586C59.3838 18.1586 59.0606 18.0823 58.8138 17.9295C58.5788 17.7767 58.3379 17.5417 58.0912 17.2244L55.4296 14.2632H55.3944V16.8014C55.3944 17.7062 54.9537 18.1586 54.0724 18.1586ZM63.5838 21.2961C63.3488 21.2961 63.1725 21.2315 63.055 21.1022C62.9375 20.9847 62.8788 20.8084 62.8788 20.5734V10.033C62.8788 9.79794 62.9375 9.62168 63.055 9.50417C63.1725 9.37491 63.3429 9.31028 63.5662 9.31028C63.8012 9.31028 63.9775 9.37491 64.095 9.50417C64.2242 9.62168 64.2888 9.79794 64.2888 10.033V11.7074L64.095 11.4607C64.283 10.7909 64.6531 10.2621 65.2054 9.87432C65.7695 9.47479 66.4392 9.27503 67.2148 9.27503C67.9786 9.27503 68.6425 9.45717 69.2066 9.82144C69.7823 10.174 70.223 10.6851 70.5285 11.3549C70.8458 12.013 71.0044 12.8003 71.0044 13.7168C71.0044 14.6216 70.8458 15.4089 70.5285 16.0787C70.223 16.7368 69.7882 17.2479 69.2242 17.6122C68.6601 17.9765 67.9904 18.1586 67.2148 18.1586C66.4392 18.1586 65.7753 17.9647 65.223 17.577C64.6708 17.1774 64.2947 16.6487 64.095 15.9906H64.3065V20.5734C64.3065 20.8084 64.2418 20.9847 64.1126 21.1022C63.9833 21.2315 63.8071 21.2961 63.5838 21.2961ZM66.9152 17.0129C67.4557 17.0129 67.9198 16.8837 68.3076 16.6252C68.7072 16.3666 69.0127 15.9906 69.2242 15.4971C69.4475 15.0035 69.5591 14.4101 69.5591 13.7168C69.5591 12.6475 69.3182 11.8308 68.8364 11.2668C68.3664 10.7028 67.726 10.4207 66.9152 10.4207C66.3864 10.4207 65.9222 10.55 65.5227 10.8085C65.1232 11.0553 64.8118 11.4254 64.5885 11.919C64.377 12.4007 64.2712 13 64.2712 13.7168C64.2712 14.7744 64.5121 15.5911 64.9939 16.1669C65.4757 16.7309 66.1161 17.0129 66.9152 17.0129ZM73.86 18.0881C73.625 18.0881 73.4487 18.0235 73.3312 17.8942C73.2137 17.7532 73.155 17.5593 73.155 17.3126V10.1035C73.155 9.85669 73.2137 9.66868 73.3312 9.53942C73.4487 9.41016 73.625 9.34553 73.86 9.34553C74.0833 9.34553 74.2595 9.41016 74.3888 9.53942C74.5181 9.66868 74.5827 9.85669 74.5827 10.1035V17.3126C74.5827 17.5593 74.5181 17.7532 74.3888 17.8942C74.2713 18.0235 74.095 18.0881 73.86 18.0881ZM73.86 7.3714C73.5662 7.3714 73.3371 7.29502 73.1726 7.14226C73.0081 6.97775 72.9258 6.76036 72.9258 6.49009C72.9258 6.20807 73.0081 5.99656 73.1726 5.85555C73.3371 5.70279 73.5662 5.62641 73.86 5.62641C74.1655 5.62641 74.3947 5.70279 74.5474 5.85555C74.7119 5.99656 74.7942 6.20807 74.7942 6.49009C74.7942 6.76036 74.7119 6.97775 74.5474 7.14226C74.3947 7.29502 74.1655 7.3714 73.86 7.3714ZM77.2869 18.1058C77.1342 18.1058 76.999 18.0588 76.8815 17.9647C76.764 17.8707 76.6994 17.7474 76.6876 17.5946C76.6876 17.4301 76.764 17.2597 76.9168 17.0834L80.0014 13.2057V13.946L77.1107 10.3326C76.9579 10.1446 76.8815 9.9742 76.8815 9.82144C76.8933 9.66868 76.9579 9.5453 77.0754 9.45129C77.1929 9.35729 77.3281 9.31028 77.4808 9.31028C77.6571 9.31028 77.804 9.34553 77.9215 9.41604C78.0507 9.47479 78.1682 9.57468 78.274 9.71568L80.7945 12.906H80.301L82.8392 9.71568C82.9449 9.57468 83.0566 9.47479 83.1741 9.41604C83.2916 9.34553 83.4385 9.31028 83.6147 9.31028C83.7793 9.31028 83.9144 9.35729 84.0201 9.45129C84.1377 9.5453 84.1964 9.67456 84.1964 9.83907C84.2082 9.99183 84.1377 10.1622 83.9849 10.3502L81.1118 13.9107V13.2586L84.1964 17.0834C84.3374 17.2597 84.402 17.4301 84.3903 17.5946C84.3903 17.7474 84.3315 17.8707 84.214 17.9647C84.0965 18.0588 83.9555 18.1058 83.791 18.1058C83.6265 18.1058 83.4796 18.0705 83.3503 18C83.2328 17.9412 83.1153 17.8414 82.9978 17.7004L80.2834 14.2809H80.7945L78.0801 17.7004C77.9744 17.8296 77.8568 17.9295 77.7276 18C77.6101 18.0705 77.4632 18.1058 77.2869 18.1058Z"
              fill="rgba(0, 0, 0, 0.87)"
            ></path>
          </svg>
          <button
            data-modal-target="clickpix-checkout"
            data-modal-toggle="clickpix-checkout"
            className="text-zinc-400"
            onClick={closeModal}
          >
            X
          </button>
        </div>

        <div
          className="
            modal-body
            w-full max-h-[600px]  overflow-auto
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-width]:thin
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-track]:rounded-lg
            [&::-webkit-scrollbar-thumb]:bg-neutral-400
            [&::-webkit-scrollbar-thumb]:rounded-lg
          "
        >
          {/* Separator */}
          <div className="border-b border-zinc-200"></div>

          {/* Body */}
          <div className="mx-auto flex items-center justify-center my-6">
            {/* Spacing */}
            {/* <div className="w-1/6"></div> */}

            {/* Content */}
            <div className="flex flex-col items-center justify-center text-center gap-4">
              {/* <PixChargeEnvironmentBanner /> */}

              <OpenPixLogo />

              <h4 className="text-lg font-bold text-align">
                Pague {centsToBRL(order.value)} para Teste via Pix
              </h4>
              <h5 className="text-md font-normal text-align text-muted text-zinc-400">
                Insira seus dados para continuar
              </h5>
              <form
                id="checkout"
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(
                  handleCreateOrder,
                  handleInputInvalidCreateOrder
                )}
              >
                <div className="text-left flex flex-col gap-1">
                  <div className="relative">
                    <input
                      {...restTaxIDRegister}
                      {...taxIDRifm}
                      ref={(e) => {
                        taxIDRefReactHookForm(e)
                        taxIDRef.current = e
                      }}
                      type="text"
                      id="taxID"
                      name="taxID"
                      className={cx(
                        'peer text-xs text-zinc-950 px-4 py-5 w-full border border-zinc-200 appearance-none focus:outline-none focus:ring-0 rounded-md',
                        errors.taxID && 'border-red-500',
                        !errors.taxID && watchFields.taxID && 'border-green-500'
                      )}
                      placeholder=""
                      onChange={combineHandlers(
                        taxIDRifm.onChange,
                        register('taxID').onChange
                      )}
                      onBlur={combineHandlers(
                        taxIDRifm.onBlur,
                        register('taxID').onBlur
                      )}
                    />
                    <label
                      htmlFor="taxID"
                      className={cx(
                        'absolute text-sm text-zinc-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
                        !errors.taxID && watchFields.taxID && 'text-green-500',
                        errors.taxID && 'text-red-500'
                      )}
                    >
                      CPF ou CNPJ
                    </label>
                  </div>
                  {errors.taxID && (
                    <span className="text-red-500 ml-1.5 text-left">
                      {errors.taxID.message}
                    </span>
                  )}
                </div>

                <div className="text-left flex flex-col gap-1">
                  <div className="relative">
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      name="name"
                      className={cx(
                        'peer text-xs text-zinc-950 px-4 py-5 w-full border border-zinc-200 appearance-none focus:outline-none focus:ring-0 rounded-md',
                        errors.name && 'border-red-500',
                        !errors.name && watchFields.name && 'border-green-500'
                      )}
                      placeholder=""
                    />
                    <label
                      htmlFor="name"
                      className={cx(
                        'absolute text-sm text-zinc-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
                        !errors.name && watchFields.name && 'text-green-500',
                        errors.name && 'text-red-500'
                      )}
                    >
                      Nome
                    </label>
                  </div>

                  {errors.name && (
                    <span className="text-red-500 ml-1.5 text-left">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="text-left flex flex-col gap-1">
                  <div className="relative">
                    <input
                      {...register('email')}
                      type="text"
                      id="email"
                      name="email"
                      className={cx(
                        'peer text-xs text-zinc-950 px-4 py-5 w-full border border-zinc-200 appearance-none focus:outline-none focus:ring-0 rounded-md',
                        !errors.email &&
                          watchFields.email &&
                          'border-green-500',
                        errors.email && 'border-red-500'
                      )}
                      placeholder=""
                    />
                    <label
                      htmlFor="email"
                      className={cx(
                        'absolute text-sm text-zinc-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
                        !errors.email && watchFields.email && 'text-green-500',
                        errors.email && 'text-red-500'
                      )}
                    >
                      Email
                    </label>
                  </div>
                  {errors.email && (
                    <span className="text-red-500 ml-1.5 text-left">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center relative">
                      {/* <div className="relative">
                        <DropdownDDI />
                      </div> */}

                      <DropdownDDI />

                      <TriggerDrowpdownDDI
                        errors={errors}
                        watchFields={watchFields}
                      />

                      <label
                        htmlFor="Celular"
                        className={cx(
                          'absolute text-sm text-zinc-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1',
                          !errors.phone &&
                            watchFields.phone &&
                            'text-green-500',
                          errors.phone && 'text-red-500'
                        )}
                      >
                        Celular
                      </label>
                      <div className="relative w-full">
                        <input
                          {...register('phone')}
                          {...phoneRifm}
                          type="text"
                          name="phone"
                          className={cx(
                            'block px-4 py-5 w-full z-20 text-sm text-gray-900 rounded-e-lg border-ss-none border-s-0 border border-gray-300 outline-none',
                            !errors.phone &&
                              watchFields.phone &&
                              'border-green-500',
                            errors.phone && 'border-red-500'
                          )}
                          placeholder="(12) 34567-8910"
                          onChange={combineHandlers(
                            phoneRifm.onChange,
                            register('phone').onChange
                          )}
                          onBlur={combineHandlers(
                            phoneRifm.onBlur,
                            register('phone').onBlur
                          )}
                        />
                      </div>
                    </div>

                    {errors.phone && (
                      <span className="text-red-500 ml-1.5 text-left">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className="w-full text-xs bg-green-500 text-white p-3 rounded-md disabled:text-muted disabled:bg-gray-200"
                  type="submit"
                  disabled={requesting}
                >
                  Continuar
                </button>
              </form>
            </div>

            {/* Spacing */}
            {/* <div className="w-1/6"></div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
