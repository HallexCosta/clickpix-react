export function combineHandlers(handler1, handler2) {
  return (e) => {
    if (handler1) handler1(e)
    if (handler2) handler2(e)
  }
}
