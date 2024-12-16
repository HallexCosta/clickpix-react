export const hideCNPJMask = (cnpj: string): string | null => {
  const cleanedCNPJ = cnpj.replace(/\D/g, '')

  if (cleanedCNPJ.length !== 14) {
    console.error('CNPJ is invalid')
    return null
  }

  return `${cleanedCNPJ.slice(0, 2)}.${cleanedCNPJ.slice(2, 4)}*.***/${cleanedCNPJ.slice(8, 12)}-${cleanedCNPJ.slice(12)}`
}
