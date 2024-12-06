export {}

declare global {
  interface Window {
    $openpix: {
      push: (...data: any) => void
    }
    $openpixSDK: {
      updateIn: (
        memoryId: string | number,
        state: string,
        updatedData: object
      ) => boolean
      get: (memoryId: string | number, state: string) => object
      addEvent: (
        hookName: string,
        hookHandler: (...args: any[]) => Promise<void>
      ) => boolean
    }
  }
}
