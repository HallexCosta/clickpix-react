export const GetPixChargeByCorrelationIDQuery = String.raw`
  query PixDialogGetChargeQuery($correlationID: String) {
    ...Plugin_query
    charge(correlationID: $correlationID) {
      ...PixDialogGetCharge_charge
      id
    }
  }

  fragment ChargePDFDocument_charge on Charge {
    value
    brCode
    company {
      name
      nameFriendly
      projectType
      taxID {
        taxID
      }
      id
    }
    customer {
      name
      taxID {
        taxID
      }
      id
    }
    expiresDate
    createdAt
    comment
    identifier
    ...useChargePaymentMethod_charge
  }

  fragment ChargePrintPDF_charge on Charge {
    status
    ...ChargePDFDocument_charge
  }

  fragment ITPButton_charge on Charge {
    availablePaymentMethods
    customer {
      id
    }
  }

  fragment Order_charge on Charge {
    id
    status
    ...Payment_charge
  }

  fragment Order_query on Query {
    ...Payment_query
  }

  fragment PaymentActiveBarcode_charge on Charge {
    ...useChargePaymentMethod_charge
  }

  fragment PaymentActiveBoleto_charge on Charge {
    ...PaymentLinkComment_charge
    ...PaymentLinkActiveEarnDiscount_charge
    ...PaymentLinkAdditionalInfo_charge
    ...PaymentLinkShareButton_charge
    ...PaymentActiveBarcode_charge
    ...useChargePaymentMethod_charge
    ...PaymentMethodPaymentDeadline_charge
    ...PaymentMethodTransactionDetails_charge
    ...PaymentMethodBoletoValue_charge
    ...PaymentLinkActiveQrCode_charge
  }

  fragment PaymentActiveCob_charge on Charge {
    id
    ...PaymentLinkActiveRoot_charge
  }

  fragment PaymentActiveCreditCardFailed_charge on Charge {
    id
    brCode
    identifier
    company {
      nameFriendly
      logo {
        url(fitIn: true)
        id
      }
      projectType
      taxID {
        taxID
      }
      id
    }
    ...PaymentLinkComment_charge
    ...PaymentLinkPaymentTerm_charge
    ...PaymentLinkAdditionalInfo_charge
    ...PaymentLinkTransactionDetails_charge
  }

  fragment PaymentActiveCreditCardValue_charge on Charge {
    company {
      ...PaymentLinkActiveValue_company
      id
    }
    value
    valueWithDiscount
  }

  fragment PaymentActiveCreditCard_charge on Charge {
    id
    brCode
    identifier
    company {
      nameFriendly
      logo {
        url(fitIn: true)
        id
      }
      projectType
      taxID {
        taxID
      }
      id
    }
    valueWithDiscount
    ...PaymentLinkComment_charge
    ...PaymentLinkPaymentTerm_charge
    ...PaymentLinkAdditionalInfo_charge
    ...PaymentLinkTransactionDetails_charge
  }

  fragment PaymentActiveCustomerPixCreditCard_charge on Charge {
    customer {
      name
      id
    }
    value
    valueWithDiscount
    type
  }

  fragment PaymentActiveCustomer_charge on Charge {
    customer {
      name
      id
    }
    type
    ...PaymentActiveCustomerPixCreditCard_charge
  }

  fragment PaymentActiveITPBanksList_charge on Charge {
    companyBankAccount {
      itpCode
      id
    }
  }

  fragment PaymentActiveITPBanks_charge on Charge {
    id
    ...PaymentActiveITPBanksList_charge
  }

  fragment PaymentActiveITPDetails_charge on Charge {
    identifier
    companyBankAccount {
      pixKeyRecipient {
        pixKey
        pixKeyType
        id
      }
      id
    }
  }

  fragment PaymentActiveITPValue_charge on Charge {
    value
    valueWithDiscount
    company {
      ...PaymentLinkActiveValue_company
      id
    }
  }

  fragment PaymentActiveITP_charge on Charge {
    ...PaymentActiveITPValue_charge
    ...PaymentLinkComment_charge
    ...PaymentLinkActiveEarnDiscount_charge
    ...PaymentLinkActiveEarnCashback_charge
    ...PaymentLinkActiveCashbackFidelityBalance_charge
    ...PaymentLinkActiveEarnCashbackFidelity_charge
    ...ITPButton_charge
    ...PaymentLinkPaymentTerm_charge
    ...PaymentActiveITPDetails_charge
    ...PaymentLinkAdditionalInfo_charge
  }

  fragment PaymentActiveInstallmentCompleted_charge on Charge {
    ...PaymentCompleted_charge
  }

  fragment PaymentActiveInstallmentCompleted_query on Query {
    ...PaymentCompleted_query
  }

  fragment PaymentActiveInstallmentExpired_charge on Charge {
    ...PaymentExpired_charge
  }

  fragment PaymentActiveInstallmentScheduled_charge on Charge {
    id
    brCode
    identifier
    company {
      nameFriendly
      logo {
        url(fitIn: true)
        id
      }
      projectType
      taxID {
        taxID
      }
      id
    }
    valueWithDiscount
    ...PaymentLinkComment_charge
    ...PaymentLinkAdditionalInfo_charge
    ...PaymentLinkTransactionDetails_charge
  }

  fragment PaymentActiveInstallment_charge on Charge {
    id
    paymentMethods {
      __typename
      ... on PaymentMethodInstallments {
        method
        subscription {
          currentInstallment {
            status
            charge {
              status
              brCode
              ...PaymentActiveCob_charge
              ...PaymentActiveInstallmentCompleted_charge
              ...PaymentActiveInstallmentExpired_charge
              ...PaymentActiveInstallmentScheduled_charge
              id
            }
            id
          }
          id
        }
      }
    }
  }

  fragment PaymentActiveInstallment_query on Query {
    ...PaymentActiveInstallmentCompleted_query
  }

  fragment PaymentActiveMethodInstallment_charge on Charge {
    valueWithDiscount
    availablePaymentMethods
    availablePaymentMethodsList {
      __typename
      ... on PaymentMethodAvailableInstallments {
        installments {
          installmentNumber
          value
          discount
        }
      }
    }
  }

  fragment PaymentActivePixCobValue_charge on Charge {
    id
    value
    valueWithDiscount
    company {
      ...PaymentLinkActiveValue_company
      id
    }
    decodedBrCode {
      interests
      fines
      finalValue
    }
    chargeIntent {
      id
    }
    installment: paymentSubscriptionInstallment {
      installmentNumber
      id
    }
    paymentMethods {
      __typename
      ... on PaymentMethodPix {
        value
        valueWithDiscount
      }
    }
    ...PaymentLinkValueFirstInstallment_charge
    ...useChargePaymentMethod_charge
  }

  fragment PaymentActivePixCreditCard_charge on Charge {
    id
    brCode
    identifier
    company {
      nameFriendly
      logo {
        url(fitIn: true)
        id
      }
      projectType
      taxID {
        taxID
      }
      id
    }
    ...useChargePaymentMethod_charge
    ...PaymentActiveCreditCard_charge
    ...PaymentActiveCob_charge
  }

  fragment PaymentActivePixCreditCard_query on Query {
    ...useGraphQLType_query
  }

  fragment PaymentActiveWaitingCustomerFillData_charge on Charge {
    id
    ...PaymentActivePixCobValue_charge
    ...PaymentLinkTransactionDetails_charge
    ...PaymentLinkAdditionalInfo_charge
    ...PaymentLinkPaymentTerm_charge
    ...PaymentLinkComment_charge
    ...PaymentLinkActiveEarnCashback_charge
    ...PaymentLinkActiveCashbackFidelityBalance_charge
    ...PaymentLinkActiveEarnCashbackFidelity_charge
    paymentMethodSelected
  }

  fragment PaymentActiveWaitingPaymentMethodCreditCard_charge on Charge {
    id
    status
    identifier
    availablePaymentMethods
    company {
      nameFriendly
      taxID {
        taxID
      }
      id
    }
    customer {
      name
      taxID {
        taxID
      }
      id
    }
    valueWithDiscount
    ...PaymentLinkComment_charge
    ...PaymentLinkAdditionalInfo_charge
    ...PaymentActiveCreditCardValue_charge
    ...PaymentMethodPaymentDeadline_charge
    ...PaymentMethodTransactionDetails_charge
    ...PaymentMethodCreditCardValue_charge
    cardProcessingProvider
  }

  fragment PaymentActiveWaitingPaymentMethodPixCreditCard_charge on Charge {
    id
    status
    identifier
    availablePaymentMethods
    company {
      nameFriendly
      taxID {
        taxID
      }
      id
    }
    customer {
      name
      taxID {
        taxID
      }
      id
    }
    availablePaymentMethodsPixCredit {
      options {
        valueInCash
        installmentNumber
        installmentValue
        installmentValueTotal
      }
    }
    valueWithDiscount
    ...PaymentPixCreditOptions_charge
    ...PaymentActiveCreditCard_charge
    ...PaymentLinkComment_charge
    ...PaymentActiveCustomer_charge
    ...PaymentLinkAdditionalInfo_charge
    ...PaymentLinkPaymentTerm_charge
    ...PaymentLinkTransactionDetails_charge
  }

  fragment PaymentActiveWaitingPaymentMethodPixCreditCard_query on Query {
    appEnv
    ...useGraphQLType_query
  }

  fragment PaymentActiveWaitingPaymentMethodRoot_charge on Charge {
    id
    availablePaymentMethods
    ...PaymentActiveWaitingPaymentMethod_charge
    ...PaymentActiveWaitingPaymentMethodCreditCard_charge
    ...PaymentActiveWaitingPaymentMethodPixCreditCard_charge
  }

  fragment PaymentActiveWaitingPaymentMethodRoot_query on Query {
    ...PaymentActiveWaitingPaymentMethodPixCreditCard_query
  }

  fragment PaymentActiveWaitingPaymentMethod_charge on Charge {
    id
    status
    identifier
    availablePaymentMethods
    company {
      nameFriendly
      taxID {
        taxID
      }
      id
    }
    ...PaymentLinkComment_charge
    ...PaymentActiveCustomer_charge
    ...PaymentActiveMethodInstallment_charge
    ...PaymentLinkAdditionalInfo_charge
    ...PaymentLinkPaymentTerm_charge
    ...PaymentLinkTransactionDetails_charge
  }

  fragment PaymentActive_charge on Charge {
    id
    status
    ...useChargePaymentMethod_charge
    ...PaymentActivePixCreditCard_charge
    ...PaymentActiveInstallment_charge
    ...PaymentActiveCob_charge
    ...PaymentActiveCreditCard_charge
    ...PaymentActiveCreditCardFailed_charge
    ...PaymentActiveITPBanks_charge
    ...PaymentActiveITP_charge
  }

  fragment PaymentActive_query on Query {
    ...PaymentActivePixCreditCard_query
    ...PaymentActiveInstallment_query
  }

  fragment PaymentCharge_charge on Charge {
    id
    status
    isRemoved
    customerRegister
    customer {
      name
      id
    }
    isFromTestAccount
    paymentMethodSelected
    company {
      projectType
      ...PaymentCompanySupport_company
      ...PaymentCompanyLogo_company
      id
    }
    ...PaymentActive_charge
    ...PaymentActiveWaitingPaymentMethodRoot_charge
    ...PaymentDeleted_charge
    ...PaymentCompleted_charge
    ...PaymentExpired_charge
    ...PaymentActiveWaitingCustomerFillData_charge
    ...PaymentTestAccountBanner_charge
    ...PaymentMethodCreditCardSelected_charge
    ...PaymentMethodBoletoSelected_charge
    ...PaymentDispute_charge
    ...PaymentMethodSelectedPending_charge
    ...PaymentMethodPixSelected_charge
    ...PaymentShopify_charge
  }

  fragment PaymentCharge_query on Query {
    ...PaymentActiveWaitingPaymentMethodRoot_query
    ...PaymentActive_query
    ...PaymentCompleted_query
    ...PaymentMethodCreditCardSelected_query
    ...PaymentMethodBoletoSelected_query
  }

  fragment PaymentCompanyLogo_company on Company {
    projectType
    logo {
      url(fitIn: true)
      id
    }
  }

  fragment PaymentCompanySupportEmail_company on Company {
    preferences {
      support {
        email
      }
    }
  }

  fragment PaymentCompanySupportPhone_company on Company {
    preferences {
      support {
        phone
      }
    }
  }

  fragment PaymentCompanySupportWebsite_company on Company {
    preferences {
      support {
        website
      }
    }
  }

  fragment PaymentCompanySupportWhatsApp_company on Company {
    preferences {
      support {
        phone
      }
    }
  }

  fragment PaymentCompanySupport_company on Company {
    preferences {
      support {
        email
        phone
        website
      }
    }
    ...PaymentCompanySupportEmail_company
    ...PaymentCompanySupportPhone_company
    ...PaymentCompanySupportWebsite_company
    ...PaymentCompanySupportWhatsApp_company
  }

  fragment PaymentCompleted_charge on Charge {
    ...PaymentLinkCompleted_charge
  }

  fragment PaymentCompleted_query on Query {
    ...PaymentLinkCompleted_query
  }

  fragment PaymentDeleted_charge on Charge {
    identifier
    company {
      nameFriendly
      taxID {
        taxID
      }
      id
    }
    ...PaymentLinkDeletedValue_charge
    ...PaymentLinkAdditionalInfo_charge
  }

  fragment PaymentDispute_charge on Charge {
    id
    value
    status
    transactions: pixTransactions {
      edges {
        node {
          endToEndId
          id
        }
      }
    }
    payer {
      email
      phone
      taxID {
        taxID
      }
      id
    }
    company {
      taxID {
        taxID
      }
      id
    }
  }

  fragment PaymentExpired_charge on Charge {
    identifier
    company {
      nameFriendly
      taxID {
        taxID
      }
      id
    }
    ...PaymentLinkExpiredValue_charge
    ...PaymentLinkAdditionalInfo_charge
    ...PaymentMethodTransactionDetails_charge
  }

  fragment PaymentInstallmentPlan_charge on Charge {
    chargeIntent {
      id
    }
    paymentMethods {
      __typename
      ... on PaymentMethodInstallments {
        method
      }
    }
    ...PaymentInstallments_charge
  }

  fragment PaymentInstallmentRow_paymentSubscriptionInstallment on PaymentSubscriptionInstallment {
    status
    installmentNumber
    value
    dateGenerateCharge
  }

  fragment PaymentInstallments_charge on Charge {
    subscription: paymentSubscription {
      installments: paymentSubscriptionInstallments(first: 12) {
        edges {
          node {
            ...PaymentInstallmentRow_paymentSubscriptionInstallment
            id
          }
        }
      }
      id
    }
    paymentMethods {
      __typename
      ... on PaymentMethodInstallments {
        method
        subscription {
          installments: paymentSubscriptionInstallments(first: 12) {
            edges {
              node {
                ...PaymentInstallmentRow_paymentSubscriptionInstallment
                id
              }
            }
          }
          id
        }
      }
    }
  }

  fragment PaymentLinkActiveCashbackFidelityBalance_charge on Charge {
    customer {
      cashbackFidelityBalance
      id
    }
  }

  fragment PaymentLinkActiveEarnCashbackFidelity_charge on Charge {
    cashbackExclusive {
      percentage
      value
      status
      id
    }
  }

  fragment PaymentLinkActiveEarnCashback_charge on Charge {
    cashback {
      percentage
      value
      status
      id
    }
  }

  fragment PaymentLinkActiveEarnDiscount_charge on Charge {
    discount
  }

  fragment PaymentLinkActiveInterestsSettings_charge on Charge {
    interestsSettings {
      active
    }
    decodedBrCode {
      interests
      fines
      finalValue
    }
    paymentMethods {
      __typename
      ... on PaymentMethodPix {
        value
      }
    }
    ...useChargePaymentMethod_charge
  }

  fragment PaymentLinkActivePixCreditCard_charge on Charge {
    value
    valueWithDiscount
    ...useChargePaymentMethod_charge
  }

  fragment PaymentLinkActiveQrCode_charge on Charge {
    paymentMethods {
      __typename
      ... on PaymentMethodPix {
        method
        brCode
      }
    }
    ...useChargePaymentMethod_charge
  }

  fragment PaymentLinkActiveRoot_charge on Charge {
    id
    brCode
    identifier
    company {
      nameFriendly
      logo {
        url(fitIn: true)
        id
      }
      projectType
      taxID {
        taxID
      }
      id
    }
    paymentMethods {
      __typename
      ... on PaymentMethodPix {
        brCode
      }
    }
    ...PaymentActivePixCobValue_charge
    ...PaymentLinkComment_charge
    ...PaymentLinkActiveEarnDiscount_charge
    ...PaymentLinkActiveEarnCashback_charge
    ...PaymentLinkActiveCashbackFidelityBalance_charge
    ...PaymentLinkActiveEarnCashbackFidelity_charge
    ...PaymentLinkActiveQrCode_charge
    ...PaymentLinkShareButton_charge
    ...PaymentLinkActiveInterestsSettings_charge
    ...PaymentInstallmentPlan_charge
    ...PaymentLinkPaymentTerm_charge
    ...PaymentLinkTransactionDetails_charge
    ...PaymentLinkAdditionalInfo_charge
    ...useChargePaymentMethod_charge
    ...PaymentLinkActivePixCreditCard_charge
    ...ITPButton_charge
    ...ChargePrintPDF_charge
  }

  fragment PaymentLinkActiveValue_company on Company {
    nameFriendly
  }

  fragment PaymentLinkAdditionalInfo_charge on Charge {
    additionalInfo {
      key
      value
    }
  }

  fragment PaymentLinkComment_charge on Charge {
    comment
  }

  fragment PaymentLinkCompletedPaymentMethods_charge on Charge {
    id
    ...useChargePaymentMethod_charge
  }

  fragment PaymentLinkCompletedPixCreditCard_charge on Charge {
    value
    valueWithDiscount
    ...useChargePaymentMethod_charge
  }

  fragment PaymentLinkCompletedPixCreditCard_query on Query {
    ...useGraphQLType_query
  }

  fragment PaymentLinkCompletedQrCodeValue_charge on Charge {
    id
    discount
    value
    valuePaid
    valueWithDiscount
    chargeIntent {
      id
    }
    type
  }

  fragment PaymentLinkCompletedRedirect_charge on Charge {
    redirectUrl
    status
  }

  fragment PaymentLinkCompletedRewards_charge on Charge {
    cashback {
      value
      status
      receiver {
        taxIDObscured {
          taxID
          type
        }
        id
      }
      id
    }
    cashbackExclusive {
      value
      status
      receiver {
        taxIDObscured {
          taxID
          type
        }
        id
      }
      id
    }
    redeemedCashbackExclusive {
      edges {
        node {
          value
          receiver {
            taxIDObscured {
              taxID
              type
            }
            id
          }
          id
        }
      }
    }
    payer {
      taxIDObscured {
        taxID
        type
      }
      id
    }
  }

  fragment PaymentLinkCompletedTransaction_charge on Charge {
    transactions: pixTransactions {
      edges {
        node {
          endToEndId
          id
        }
      }
    }
  }

  fragment PaymentLinkCompleted_charge on Charge {
    id
    discount
    identifier
    redirectUrl
    company {
      nameFriendly
      taxID {
        taxID
      }
      id
    }
    ...PaymentLinkCompletedQrCodeValue_charge
    ...PaymentInstallmentPlan_charge
    ...PaymentLinkCompletedTransaction_charge
    ...PaymentLinkAdditionalInfo_charge
    ...PaymentLinkCompletedRewards_charge
    ...PaymentLinkTransactionDetails_charge
    ...PaymentLinkCompletedPixCreditCard_charge
    ...PaymentLinkCompletedPaymentMethods_charge
    ...PaymentLinkCompletedRedirect_charge
  }

  fragment PaymentLinkCompleted_query on Query {
    ...PaymentLinkCompletedPixCreditCard_query
  }

  fragment PaymentLinkDeletedValue_charge on Charge {
    id
    value
    valueWithDiscount
  }

  fragment PaymentLinkExpiredValue_charge on Charge {
    id
    discount
    value
    valueWithDiscount
  }

  fragment PaymentLinkPaymentTerm_charge on Charge {
    status
    expiresDate
    company {
      id
      preferences {
        chargeSettings {
          expiration {
            type
            fakeValue
          }
        }
      }
    }
    interestsSettings {
      daysAfterDueDate
    }
  }

  fragment PaymentLinkShareButton_charge on Charge {
    company {
      nameFriendly
      projectType
      id
    }
    paymentLinkUrl
    cashback {
      value
      id
    }
    customer {
      phone
      id
    }
    paymentMethods {
      __typename
      ... on PaymentMethodPix {
        value
        valueWithDiscount
      }
    }
    ...useChargePaymentMethod_charge
  }

  fragment PaymentLinkTransactionDetails_charge on Charge {
    identifier
    company {
      nameFriendly
      projectType
      taxID {
        taxID
      }
      id
    }
  }

  fragment PaymentLinkValueFirstInstallment_charge on Charge {
    id
    paymentMethods {
      __typename
      ... on PaymentMethodPix {
        value
        valueWithDiscount
      }
    }
    customer {
      name
      id
    }
    company {
      nameFriendly
      id
    }
  }

  fragment PaymentMethodBoletoPixValue_charge on Charge {
    company {
      nameFriendly
      id
    }
    value
  }

  fragment PaymentMethodBoletoSelected_charge on Charge {
    id
    status
    customer {
      id
    }
    ...PaymentActiveBoleto_charge
    ...PaymentCompleted_charge
    ...PaymentMethodSelectedCustomerRegister_charge
  }

  fragment PaymentMethodBoletoSelected_query on Query {
    ...PaymentCompleted_query
  }

  fragment PaymentMethodBoletoValue_charge on Charge {
    company {
      nameFriendly
      id
    }
    value
    ...useChargePaymentMethod_charge
    ...PaymentMethodBoletoPixValue_charge
  }

  fragment PaymentMethodCreditCardSelectedProcessing_charge on Charge {
    id
    brCode
    identifier
    company {
      nameFriendly
      logo {
        url(fitIn: true)
        id
      }
      projectType
      taxID {
        taxID
      }
      id
    }
    valueWithDiscount
    ...PaymentLinkComment_charge
    ...PaymentLinkAdditionalInfo_charge
    ...PaymentLinkTransactionDetails_charge
  }

  fragment PaymentMethodCreditCardSelected_charge on Charge {
    id
    status
    customer {
      id
    }
    ...PaymentCompleted_charge
    ...PaymentActiveWaitingPaymentMethodCreditCard_charge
    ...PaymentMethodCreditCardSelectedProcessing_charge
    ...PaymentMethodSelectedCustomerRegister_charge
    ...useChargePaymentMethod_charge
  }

  fragment PaymentMethodCreditCardSelected_query on Query {
    ...PaymentCompleted_query
  }

  fragment PaymentMethodCreditCardValue_charge on Charge {
    value
    company {
      nameFriendly
      id
    }
  }

  fragment PaymentMethodPaymentDeadline_charge on Charge {
    expiresDate
    createdAt
    company {
      id
      nameFriendly
      preferences {
        chargeSettings {
          expiration {
            type
            fakeValue
          }
        }
      }
    }
  }

  fragment PaymentMethodPendingMessage_charge on Charge {
    company {
      nameFriendly
      id
    }
    value
  }

  fragment PaymentMethodPixQrCode_charge on Charge {
    ...useChargePaymentMethod_charge
  }

  fragment PaymentMethodPixSelected_charge on Charge {
    id
    brCode
    identifier
    customerRegister
    customer {
      id
    }
    company {
      nameFriendly
      logo {
        url(fitIn: true)
        id
      }
      projectType
      taxID {
        taxID
      }
      id
    }
    paymentMethods {
      __typename
      ... on PaymentMethodPix {
        brCode
      }
    }
    ...PaymentMethodPixValue_charge
    ...PaymentLinkComment_charge
    ...PaymentLinkActiveEarnDiscount_charge
    ...PaymentLinkActiveEarnCashback_charge
    ...PaymentLinkActiveCashbackFidelityBalance_charge
    ...PaymentLinkActiveEarnCashbackFidelity_charge
    ...PaymentLinkShareButton_charge
    ...PaymentLinkActiveInterestsSettings_charge
    ...PaymentLinkAdditionalInfo_charge
    ...useChargePaymentMethod_charge
    ...PaymentMethodPixQrCode_charge
    ...PaymentMethodTransactionDetails_charge
    ...PaymentMethodPaymentDeadline_charge
    ...PaymentMethodSelectedCustomerRegister_charge
    ...ChargePrintPDF_charge
  }

  fragment PaymentMethodPixValue_charge on Charge {
    company {
      nameFriendly
      id
    }
    value
    paymentMethods {
      __typename
      ... on PaymentMethodPix {
        method
        value
      }
    }
  }

  fragment PaymentMethodSelectedCustomerRegisterFormFields_charge on Charge {
    id
    paymentMethodSelected
    customerRegisterFields
  }

  fragment PaymentMethodSelectedCustomerRegisterForm_charge on Charge {
    id
    paymentMethodSelected
  }

  fragment PaymentMethodSelectedCustomerRegisterValue_charge on Charge {
    value
    paymentMethodSelected
    company {
      nameFriendly
      id
    }
    ...PaymentMethodPixValue_charge
    ...PaymentMethodBoletoValue_charge
    ...PaymentMethodCreditCardValue_charge
  }

  fragment PaymentMethodSelectedCustomerRegister_charge on Charge {
    id
    customerRegisterFields
    ...PaymentLinkAdditionalInfo_charge
    ...PaymentLinkComment_charge
    ...PaymentMethodPaymentDeadline_charge
    ...PaymentMethodTransactionDetails_charge
    ...PaymentLinkActiveEarnCashback_charge
    ...PaymentLinkActiveCashbackFidelityBalance_charge
    ...PaymentLinkActiveEarnCashbackFidelity_charge
    ...PaymentMethodSelectedCustomerRegisterValue_charge
    ...PaymentMethodSelectedCustomerRegisterForm_charge
    ...PaymentMethodSelectedCustomerRegisterFormFields_charge
  }

  fragment PaymentMethodSelectedPending_charge on Charge {
    id
    availablePaymentMethods
    ...PaymentMethodPendingMessage_charge
    ...PaymentMethodTransactionDetails_charge
    ...PaymentMethodPaymentDeadline_charge
  }

  fragment PaymentMethodTransactionDetails_charge on Charge {
    identifier
    company {
      nameFriendly
      taxID {
        taxID
      }
      id
    }
  }

  fragment PaymentPixCreditOptions_charge on Charge {
    valueWithDiscount
    availablePaymentMethods
    availablePaymentMethodsPixCredit {
      options {
        valueInCash
        installmentNumber
        installmentValue
        discount
      }
    }
  }

  fragment PaymentProvider_charge on Charge {
    status
    redirectUrl
    isShopifyCharge
  }

  fragment PaymentShopify_charge on Charge {
    isShopifyCharge
    status
  }

  fragment PaymentTestAccountBanner_charge on Charge {
    id
    isFromTestAccount
  }

  fragment Payment_charge on Charge {
    ...PaymentCharge_charge
    ...PaymentProvider_charge
  }

  fragment Payment_query on Query {
    ...PaymentCharge_query
  }

  fragment PixDialogGetCharge_charge on Charge {
    ...Plugin_charge
    ...Order_charge
    ...useMeta_charge
    status
    correlationID
    metaPixel {
      token
    }
  }

  fragment Plugin_charge on Charge {
    ...Order_charge
  }

  fragment Plugin_query on Query {
    ...Order_query
  }

  fragment useChargePaymentMethod_charge on Charge {
    type
    availablePaymentMethods
    paymentMethods {
      __typename
      ... on PaymentMethodPix {
        method
        status
        brCode
        value
        valueWithDiscount
      }
      ... on PaymentMethodInstallments {
        method
      }
      ... on PaymentMethodCreditCard {
        method
        status
        installmentNumber
        value
      }
      ... on PaymentMethodITP {
        method
        status
        value
        consentId
        authorizationUrl
      }
      ... on PaymentMethodBoleto {
        method
        status
        boletoBarcode
        boletoDigitable
        value
      }
    }
  }

  fragment useGraphQLType_query on Query {
    graphqlType
  }

  fragment useMeta_charge on Charge {
    status
    value
    identifier
    metaPixel {
      token
    }
  }

`;
