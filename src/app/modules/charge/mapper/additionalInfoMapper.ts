import type { AdditionalInfo } from '../services/createPixChargeRequest'

export const additionalInfoMapper = {
  toArray(additionalInfo: string) {
    return additionalInfo.split(',').reduce<AdditionalInfo[]>((acc, curr) => {
      const [key, value] = curr.split(':')
      acc.push({ key, value })
      return acc
    }, [])
  },
  toString(additionalInfos: AdditionalInfo[]) {
    return additionalInfos
      .reduce<string>((acc, curr: AdditionalInfo) => {
        return acc.concat(`,${curr.key}:${curr.value}`)
      }, '')
      .slice(1)
  }
}
