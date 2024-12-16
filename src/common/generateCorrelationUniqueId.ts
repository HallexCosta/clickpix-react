export const generateCorrelationUniqueId = (
  len: number,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
) =>
  [...Array(len)]
    .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
    .join('')
