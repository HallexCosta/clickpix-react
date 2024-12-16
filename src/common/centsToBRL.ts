export const centsToBRL = (cents: number) => {
  if (!cents) return '[Without Value]'

  // Convert cents to BRL
  const brlAmount = cents / 100

  // Format the amount to BRL currency
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(brlAmount)

  return formattedAmount
}
