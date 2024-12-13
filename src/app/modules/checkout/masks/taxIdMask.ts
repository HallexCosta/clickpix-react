import { cnpjMask } from './cnpjMask'
import { cpfMask } from './cpfMask'

export const taxIDMask = (str: string) => {
  const digits = str.replace(/\D+/g, '')
  console.log('start here', digits)

  if (digits.length <= 11) {
    return cpfMask(digits)
  }
  return cnpjMask(digits)
}
