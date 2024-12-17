import { cnpjMask } from './cnpjMask'
import { cpfMask } from './cpfMask'

export const taxIDMask = (str: string) => {
  const digits = str.replace(/\D+/g, '')

  if (digits.length <= 11) {
    return cpfMask(digits)
  }
  return cnpjMask(digits)
}
