export const createPromiseWithResolvers = () => {
  let resolve,
    reject = null
  const promise = new Promise((res, rej) => {
    resolve = res
    rej = rej
  })
  return {
    resolve,
    reject,
    promise
  }
}
