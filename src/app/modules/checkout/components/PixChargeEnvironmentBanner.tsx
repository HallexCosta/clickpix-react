export const PixChargeEnvironmentBanner = () => (
  <div className=" mx-auto relative flex items-center justify-center rounded-md p-2 bg-red-600 w-full">
    <div className="w-6 h-6 fill-white">
      <svg
        className=""
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="WarningIcon"
      >
        <path d="M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z"></path>
      </svg>
    </div>
    <span className="text-white text-xl">Cobrança Teste</span>
  </div>
)
