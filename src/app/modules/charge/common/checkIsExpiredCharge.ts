// type

export const checkIsExpiredCharge = (expirationTime: Date | null): boolean => {
  if (expirationTime === null) return false

  const now = new Date()
  const diffInMs = expirationTime.getTime() - now.getTime()

  if (diffInMs <= 0) {
    return true
  }

  return false
}
