export const phoneMask = (str: string) => {
  const digits = str.replace(/\D+/g, '')
  console.log('entrei aqui', digits)

  return digits
    .replace(/(\d{1,2})/, '($1) ')
    .replace(/(\d{4,5})(\d{1,4})/, '$1-$2')
    .trim()
  // .slice(0, 11)
}
