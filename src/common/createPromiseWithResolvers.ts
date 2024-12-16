export const createPromiseWithResolvers = <T>() => {
  let resolve,
    reject = null
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    rej = rej
  })
  return {
    resolve,
    reject,
    promise
  }
}
