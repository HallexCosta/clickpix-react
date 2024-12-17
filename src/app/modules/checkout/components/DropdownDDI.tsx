import { cx } from '@/common/cx'
import { useState } from 'react'

export const TriggerDrowpdownDDI = ({ errors, watchFields }) => {
  const [open, setOpen] = useState()

  console.log({ errors, watchFields })
  return (
    <button
      id="dropdown-phone-button"
      data-dropdown-toggle="dropdown-phone"
      className={cx(
        'flex-shrink-0 z-10 inline-flex items-center px-4 py-5 text-sm font-medium text-center text-gray-900 rounded border border-gray-300 border-r-0 rounded-ee-none rounded-se-none outline-0 outline-none',
        !errors.phone && watchFields.phone && 'border-green-500',
        errors.phone && 'border-red-500'
      )}
      type="button"
      onClick={() => setOpen(true)}
    >
      <svg
        className="h-4 w-4 me-2"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 64 64"
      >
        <path
          fill="#128807"
          d="M64 43c0 6.075-3.373 11-10 11H10C3.373 54 0 49.075 0 43V21c0-6.075 3.373-11 10-11h44c6.627 0 10 4.925 10 11z"
        />
        <path
          fill="#f9cb38"
          d="M57.14 32.79L32.15 50.35L7.159 32.79L32.15 15.23z"
        />
        <g fillRule="evenodd">
          <path
            fill="#002776"
            d="M42.01 35.848c-1.138 3.867-4.699 6.811-8.731 7.211c-5.387.539-10.1-2.885-11.246-8.178a9.84 9.84 0 0 1 .126-4.705c.157-.17.374-.211.59-.241a25 25 0 0 1 4.757-.207c1.695.096 3.376.331 5.01.793c1.677.475 3.301 1.095 4.834 1.919a24 24 0 0 1 3.295 2.11c.352.273.711.541 1.049.832c.151.13.269.27.315.466"
          />
          <path
            fill="#002776"
            d="M22.724 28.611c1.291-2.885 3.468-4.806 6.477-5.708c6.06-1.817 12.277 2.188 13.178 8.434c.14.965.146 1.933-.002 2.9c-.153.057-.267-.024-.372-.111a25.3 25.3 0 0 0-3.503-2.402a23 23 0 0 0-2.952-1.408c-.18-.071-.406-.108-.468-.349c.065-.116.147-.217.245-.311c.035-.036.086-.071.039-.131c-.016-.019-.049-.019-.077-.016c-.075.008-.065.06-.062.115c.006.179-.098.294-.235.386c-.243.055-.476-.018-.673-.123c-.564-.296-1.188-.397-1.785-.562c-.931-.253-1.887-.396-2.841-.545a26 26 0 0 0-2.297-.262c-.7-.049-1.413-.042-2.118.006c-.769.054-1.54.108-2.305.2a.25.25 0 0 1-.249-.113"
          />
          <path
            fill="#fefefe"
            d="M35.09 29.905c-.004.122.105.106.171.132a25.5 25.5 0 0 1 7.11 4.2a7.5 7.5 0 0 1-.362 1.611c-1.251-1.038-2.532-2.027-3.949-2.835c-4.479-2.551-9.275-3.562-14.402-3.02c-.5.051-1 .119-1.5.18c.129-.541.293-1.072.562-1.564c3.743-.505 7.421-.218 11.03.899c.448.139.875.363 1.353.405l-.013-.011"
          />
          <path
            fill="#d9dfea"
            d="M39.75 36.35c-.301-.032.026.337-.278.329c-.265-.004-.279-.216-.409-.334c.1-.104.277-.125.333-.287c.038.171.199.207.354.292"
          />
          <path
            fill="#e9ecf3"
            d="M28.394 38.2c-.283.033-.046.341-.283.346c-.239.005-.362-.172-.41-.355c-.017-.052.213-.168.326-.254c.014.181.202.173.367.263"
          />
          <path
            fill="#edeff5"
            d="M32.14 37.643c-.393.254-.076-.32-.307-.264c.075-.12.287-.092.301-.276c.1.104.185.224.344.246c-.227-.031.02.473-.338.294"
          />
          <path
            fill="#f0f2f6"
            d="M24.02 30.905c-.094.179-.165.379-.45.259c-.146-.061.01-.261-.165-.28l.324-.285l.07.139c.026.119.263-.039.221.167"
          />
          <path
            fill="#eceff4"
            d="M24.927 35.25c-.149.047-.042.439-.362.268c-.032-.016-.172.061-.146.016c.084-.164-.104-.244-.075-.375c.175.076.165-.244.344-.158c.013.01.013.05.022.076c.019.124.261-.031.217.173"
          />
          <path
            fill="#d9dfea"
            d="M23.354 36.408c-.307.107-.078-.264-.254-.261c.082-.069.174-.198.256-.193c.098.005.188.126.278.195c-.134.045.007.408-.28.259"
          />
          <path
            fill="#d8deea"
            d="M35.22 39.947c-.325.148-.009-.289-.226-.232c-.022-.167.249-.066.215-.242l.293.235c-.119.054 0 .394-.282.239"
          />
          <path
            fill="#dce1ec"
            d="M37.3 39.706c-.269.112-.104-.25-.249-.286c.098-.063.201-.13.297-.195c.008.148.211.094.233.225c-.151.009.006.335-.281.256m1.87-1.346c-.306.155-.08-.252-.255-.235c.035-.13.236-.081.248-.231l.287.215c-.175-.005.04.424-.28.251"
          />
          <path
            fill="#d4dae7"
            d="M26.783 36.493c-.32.181-.111-.224-.259-.232c.015-.149.241-.085.251-.243c.03.146.224.104.266.235c-.191-.028.081.431-.258.24"
          />
          <path
            fill="#f2f4f7"
            d="M28.08 33.455c-.181-.012.051-.297-.171-.279c.038-.16.209-.127.303-.21c.048.101.184.124.191.269c.016.265-.219.128-.323.22"
          />
          <path
            fill="#e6e9f1"
            d="M33.35 35.567c-.277.159-.131-.196-.259-.235l.259-.219c.006.148.289.115.209.229c-.048.068.107.379-.209.225"
          />
          <path
            fill="#eaedf3"
            d="M32.11 34.676c-.316.032.01-.255-.195-.248c.08-.075.157-.203.247-.211c.078-.008.168.119.253.189c-.111.107-.094.383-.305.27"
          />
          <path
            fill="#e4e8f0"
            d="M39.782 37.01c.065.172.193.195.293.256c-.102.115-.142.291-.354.291c-.217.002-.07-.163-.119-.24c-.121-.192.326-.03.18-.307"
          />
          <path
            fill="#ced5e4"
            d="M37.518 40.494c-.076.113-.024.221-.226.225c-.231.004-.157-.165-.167-.217c-.019-.086.113-.168.189-.151c.066.012.194.049.204.143"
          />
          <path
            fill="#dae0eb"
            d="M26.714 37.29c-.165.019-.028.235-.237.228c-.191-.006-.163-.135-.184-.213c-.033-.109.128-.106.164-.188c.076.053.153.106.257.173"
          />
          <path
            fill="#d8dee9"
            d="M37.07 38.432q.106-.078.217-.152c.006.111.245.047.165.189c-.033.057.048.213-.159.199c-.186-.013-.142-.143-.223-.236"
          />
          <path
            fill="#cbd2e3"
            d="M36.31 38.775c-.036.197-.148.229-.271.252c-.209.035-.052-.122-.086-.182c-.088-.15.134-.121.16-.219c.058.076.191.074.197.149"
          />
          <path
            fill="#d1d8e6"
            d="M35.14 32.29c-.07.033.023.2-.127.152c-.114-.039-.254-.093-.244-.233c.004-.054.14-.099.216-.146c.013.101.229.068.155.227"
          />
          <path
            fill="#dadfea"
            d="M40.799 36.676c-.188.074-.103-.081-.136-.126c-.126-.171.123-.146.136-.248c.077.051.227.109.221.153a.24.24 0 0 1-.221.221"
          />
          <path
            fill="#cad2e2"
            d="M31.13 35.15c0 .116.234.07.155.215c-.032.059.036.217-.126.184c-.123-.025-.247-.097-.251-.219c0-.057.142-.118.222-.18"
          />
          <path
            fill="#d0d7e5"
            d="M34.33 38.768c-.092-.043-.096-.164-.09-.222c.01-.077.113-.181.201-.139c.054.026.207.011.17.151c-.034.134-.168.153-.281.21"
          />
          <path
            fill="#eff2f6"
            d="M38.2 38.592c.004-.001.074-.098.153-.1c.057-.002.115.116.176.182c-.082.023-.012.174-.174.172c-.146-.003-.146-.069-.155-.254"
          />
          <path
            fill="#ccd4e3"
            d="M31.766 36.06c-.027.108-.027.175-.123.173c-.098-.002-.146-.038-.144-.138c0-.079.052-.134.111-.129c.068.005.165.024.156.094"
          />
          <path
            fill="#e0e5ee"
            d="M25.634 34.504c.048.052.103.093.124.146c.018.044-.01.111-.072.118c-.069.006-.143.004-.165-.082c-.02-.084.053-.114.113-.182"
          />
          <path
            fill="#7085b1"
            d="M24.927 35.25c-.027-.115-.205-.042-.217-.174c.038.1.335-.123.217.174"
          />
          <path
            fill="#5c75a7"
            d="M24.02 30.905c-.022-.123-.211-.026-.221-.167c.053.084.321-.115.221.167"
          />
          <path
            fill="#e7eaf2"
            d="M35.11 29.916c.019-.076.08-.2.056-.223c-.326-.29.109-.339.174-.398c.119-.115.1.37.414.063c-.169.375-.395.483-.655.547z"
          />
          <path
            fill="#15a24a"
            d="M25.471 29.605c-.318-.031-.035-.445-.104-.685c-.086-.31.14-.306.36-.307c.341-.002.534.142.534.502c-.001.354-.165.494-.79.49"
          />
          <path
            fill="#13a248"
            d="M37.621 31.603c-.07.214-.329.348-.373.612c-.004.035-.104.028-.123-.074c-.08-.478-.084-.477-.437-.221c-.028.021-.077.04-.104.031c-.052-.023-.073-.075-.042-.134c.117-.228.227-.462.358-.683c.088-.146.195-.024.281.018c.189.093.422.146.44.451"
          />
          <path
            fill="#11a147"
            d="M38.516 32.381c-.184.074-.273-.065-.391-.115c-.08-.034-.155-.066-.209.023c-.059.094 0 .148.081.19c.062.031.128.055.174.104c.081.085.335.062.232.243c-.081.144-.217-.024-.307-.077c-.155-.095-.462-.147-.429-.312c.051-.265.202-.553.403-.735c.161-.146.339.13.52.199c.078.029.211.055.188.178c-.022.127-.116.053-.188.036c-.169-.039-.333-.325-.466-.127c-.08.118.249.167.353.297c.016.019.02.045.039.096m2.155 1.414c.03.234-.065.393-.31.353c-.254-.042-.447-.197-.491-.475c-.004-.028.03-.085.058-.093a.116.116 0 0 1 .151.094c.032.191.132.276.333.28c.039-.313-.526-.456-.201-.781c.163-.163.362-.028.504.103c.131.119.291.25.052.42c-.034-.018-.08-.047-.105-.027c-.051.034-.001.083.009.126"
          />
          <path
            fill="#0fa046"
            d="M33.764 30.817c-.119-.067-.113-.131-.094-.201c.038-.149-.039-.227-.175-.269c-.136-.044-.241-.038-.278.132c-.013.076-.053.129-.136.101c-.096-.035-.048-.113-.03-.17c.038-.131.072-.263.132-.388c.054-.125.016-.354.213-.339c.209.015.435.065.594.238c.071.076.1.207.042.264c-.169.174-.155.42-.268.632"
          />
          <path
            fill="#0b9f43"
            d="M27.593 29.544c-.323.122-.578.051-.827.056c-.113.003-.123-.082-.123-.168q.01-.143.008-.286c.012-.527.199-.662.717-.515c.058.016.113.026.117.091c0 .09-.065.106-.145.104q-.017-.004-.038-.003c-.155.038-.433-.137-.438.095c-.006.178.297.052.452.112q.031.015.08.054c-.098.177-.261.078-.387.099c-.075.012-.173-.021-.184.101c-.014.144.086.137.184.147c.167.02.348-.043.584.113"
          />
          <path
            fill="#079d3f"
            d="M24.938 29.62c-.174-.038-.15-.138-.18-.208c-.052-.129-.155-.129-.268-.12c-.129.012-.199.062-.188.205c.008.07.036.183-.094.167c-.112-.014-.08-.123-.086-.197c-.01-.121-.022-.245-.01-.365c.016-.134-.112-.339.081-.387c.199-.052.429-.089.636.01c.09.043.161.148.128.233c-.076.214-.016.431-.019.662"
          />
          <path
            fill="#15a24a"
            d="M22.827 29.28c.032-.271.151-.491.448-.481c.285.009.437.207.437.492c0 .283-.132.478-.433.476c-.306-.002-.41-.224-.452-.487"
          />
          <path
            fill="#11a147"
            d="M41.864 34.36c-.028.269-.161.472-.468.499c-.283.023-.433-.139-.455-.405c-.025-.269.239-.526.508-.524c.236.002.409.173.415.43"
          />
          <path
            fill="#0c9f43"
            d="M36.25 31.23c.226.182-.048.302-.058.455c-.188-.087-.423-.052-.575-.217c-.162-.176-.132-.375-.026-.569c.117-.205.297-.293.518-.215c.202.072.353.208.255.464c-.155.028-.282-.176-.5-.039c.145.067.319-.026.386.121"
          />
          <path
            fill="#19a44d"
            d="M30.81 29.17c-.132.155-.229.095-.32.097c-.088 0-.182-.073-.291.018c.098.16.335.057.427.216c-.013.023-.019.054-.036.07c-.132.104-.343-.148-.425.06c-.075.179.122.117.207.147c.096.038.215.024.331.154c-.269.118-.59.063-.701-.067c-.175-.205-.052-.569.081-.751c.157-.215.444-.005.727.056"
          />
          <path
            fill="#0d9f44"
            d="M32.515 30.04c-.227-.024-.485-.184-.55.19c-.002.012-.081.029-.105.013c-.027-.015-.042-.071-.037-.103c.059-.237.089-.491.194-.704c.122-.24.329-.037.5-.014c.204.027.317.151.295.366c-.02.185-.16.235-.297.252"
          />
          <path
            fill="#0fa046"
            d="M35.22 30.613c-.022.301-.17.509-.471.518c-.269.01-.42-.179-.414-.447c.008-.29.149-.5.462-.509c.287-.01.398.183.423.438"
          />
          <path
            fill="#0ea044"
            d="M28.479 29.527c-.033.071-.06.172-.155.149c-.165-.039-.091-.198-.131-.302c-.122-.119-.09.045-.128.075c-.014.074.02.187-.08.202c-.123.015-.094-.103-.091-.173c.01-.146.012-.299.052-.439c.035-.12-.092-.341.147-.343c.211-.001.165.214.192.343c.028.148.043.211.164.064c.125-.033.151.058.18.146c.016.128-.041.217-.15.278"
          />
          <path
            fill="#10a146"
            d="M39.13 33.2c.074 0 .149.098.221.014c.055-.063.006-.125-.043-.176q-.056-.057-.108-.118c-.102-.123-.245-.241-.104-.419c.128-.163.277-.123.425-.02c.027.052.018.102-.01.149c-.109.171.094.275.09.421c.031.137.051.275-.1.354c-.188.1-.333.008-.471-.112c-.015-.079.014-.118.1-.093"
          />
          <path
            fill="#ecf7f0"
            d="M36.25 31.23c-.077.054-.232-.121-.227.011c.01.234-.107.213-.216.144c-.147-.091-.155-.247-.062-.391c.09-.141.217-.223.371-.108c.094.069.165.173.246.262z"
          />
          <path
            fill="#17a34c"
            d="M28.545 29.29a2 2 0 0 0-.096-.181c.035-.089.067-.179.109-.265c.038-.081.104-.126.197-.096c.104.035.096.115.09.199q-.033.367-.061.734c-.146.093-.183.008-.207-.118c-.018-.091.029-.189-.032-.273"
          />
          <path
            fill="#d7efe0"
            d="M39.604 33.05c-.09-.092-.186-.179-.27-.277c-.098-.116-.06-.187.086-.206c.211.047.34.149.278.391q-.044.046-.094.092"
          />
          <path
            fill="#2bab5b"
            d="M39.698 32.958c-.097-.126-.123-.306-.278-.391l.104-.087c.168.119.475.187.174.478"
          />
          <path
            fill="#e6f5ec"
            d="M40.671 33.795c-.013-.008-.03-.012-.036-.023c-.08-.148-.345-.281-.255-.412c.113-.158.231.029.293.164c.028.057.062.113.094.172q-.05.05-.096.099"
          />
          <path
            fill="#29aa59"
            d="M39.13 33.2q-.046.047-.1.094c-.042-.03-.1-.051-.127-.094c-.051-.097-.197-.226-.028-.302c.142-.068.142.113.188.201c.019.037.043.068.067.101"
          />
          <path
            fill="#ddf1e4"
            d="M28.545 29.29c.146.057.069.179.071.27c.008.125.052.167.169.123c-.244.236-.213-.079-.307-.149c.025-.083.044-.164.067-.244"
          />
          <path
            fill="#6fc690"
            d="M28.06 29.45v-.322c.138.044.142.141.128.247z"
          />
          <path
            fill="#f5fbf7"
            d="M25.568 29.12c.014-.146-.056-.336.193-.32c.182.011.314.084.324.292c.01.224-.121.315-.328.33c-.263.021-.156-.186-.189-.302"
          />
          <path
            fill="#eff8f3"
            d="M37.1 31.32c.104.057.263.068.297.222c.017.08-.052.133-.123.11c-.132-.04-.307-.042-.325-.228c-.005-.054.053-.122.151-.104"
          />
          <path
            fill="#def2e5"
            d="M33.857 30.09c-.027.104-.1.14-.184.109c-.113-.041-.295.004-.297-.194c-.004-.103.066-.134.16-.103c.124.04.274.035.321.188"
          />
          <path
            fill="#f3faf5"
            d="M24.515 28.859c.098.012.253-.04.243.127c-.01.146-.158.123-.264.125c-.085.003-.207.047-.215-.106c-.006-.182.136-.125.236-.146"
          />
          <path
            fill="#f3faf6"
            d="M23.25 28.998c.181.012.271.12.278.29c.01.152-.065.282-.221.296c-.18.017-.261-.12-.271-.287c-.01-.154.05-.266.214-.299"
          />
          <path
            fill="#f9fcfa"
            d="M41.665 34.395c-.026.166-.126.283-.319.283c-.155-.002-.213-.115-.197-.252c.015-.186.126-.306.315-.303c.149.004.207.111.201.272"
          />
          <path
            fill="#e7f5ec"
            d="M32.28 29.548c.101.062.304-.002.333.198c.009.076-.075.115-.142.1c-.131-.029-.314.018-.33-.193c-.003-.065.026-.135.139-.105"
          />
          <path
            fill="#f5fbf7"
            d="M35.02 30.637c-.019.173-.104.294-.279.294c-.172.002-.233-.118-.225-.276c.014-.174.113-.29.282-.297c.168-.006.222.128.222.279"
          />
        </g>
      </svg>
      +55{' '}
      <svg
        className="w-2.5 h-2.5 ms-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          inejoin="round"
          strokeWidth="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
  )
}

export const DropdownDDI = () => {
  return (
    <div
      id="dropdown-phone"
      className="hidden z-10 bg-white divide-y divide-violet-100 rounded-lg shadow w-52 absolute top-[100%] max-h-40 overflow-x-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-width]:thin
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-md
      "
    >
      <ul className="py-2 text-sm text-black">
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 text-sm hover:bg-neutral-100"
            role="menuitem"
          >
            <span className="inline-flex items-center">
              <svg
                fill="none"
                aria-hidden="true"
                className="h-4 w-4 me-2"
                viewBox="0 0 20 15"
              >
                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                <mask
                  id="a"
                  style={{ maskType: 'luminance' }}
                  width="20"
                  height="15"
                  x="0"
                  y="0"
                  maskUnits="userSpaceOnUse"
                >
                  <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                </mask>
                <g mask="url(#a)">
                  <path
                    fill="#D02F44"
                    fillRule="evenodd"
                    d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                    clipRule="evenodd"
                  />
                  <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                  <g filter="url(#filter0_d_343_121520)">
                    <path
                      fill="url(#paint0_linear_343_121520)"
                      fillRule="evenodd"
                      d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                      clipRule="evenodd"
                    />
                  </g>
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_343_121520"
                    x1=".933"
                    x2=".933"
                    y1="1.433"
                    y2="6.1"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#fff" />
                    <stop offset="1" stopColor="#F0F0F0" />
                  </linearGradient>
                  <filter
                    id="filter0_d_343_121520"
                    width="6.533"
                    height="5.667"
                    x=".933"
                    y="1.433"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="1" />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                    <feBlend
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_343_121520"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_343_121520"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              United States (+1)
            </span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 text-sm hover:bg-neutral-100"
            role="menuitem"
          >
            <span className="inline-flex items-center">
              <svg className="h-4 w-4 me-2" fill="none" viewBox="0 0 20 15">
                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                <mask
                  id="a"
                  style={{ maskType: 'luminance' }}
                  width="20"
                  height="15"
                  x="0"
                  y="0"
                  maskUnits="userSpaceOnUse"
                >
                  <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                </mask>
                <g mask="url(#a)">
                  <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M-.898-.842L7.467 4.8V-.433h4.667V4.8l8.364-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.043-1.548 6.613-4.46H0V5.166h4.672L-1.941.706-.898-.842z"
                    clipRule="evenodd"
                  />
                  <path
                    stroke="#DB1F35"
                    strokeLinecap="round"
                    strokeWidth=".667"
                    d="M13.067 4.933L21.933-.9M14.009 10.088l7.947 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.189 6.093"
                  />
                  <path
                    fill="#E6273E"
                    fillRule="evenodd"
                    d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z"
                    clipRule="evenodd"
                  />
                </g>
              </svg>
              United Kingdom (+44)
            </span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 text-sm hover:bg-neutral-100"
            role="menuitem"
          >
            <span className="inline-flex items-center">
              <svg
                className="h-4 w-4 me-2"
                fill="none"
                viewBox="0 0 20 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                <mask
                  id="a"
                  style={{ maskType: 'luminance' }}
                  width="20"
                  height="15"
                  x="0"
                  y="0"
                  maskUnits="userSpaceOnUse"
                >
                  <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                </mask>
                <g mask="url(#a)">
                  <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                  <path
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth=".667"
                    d="M0 .167h-.901l.684.586 3.15 2.7v.609L-.194 6.295l-.14.1v1.24l.51-.319L3.83 5.033h.73L7.7 7.276a.488.488 0 00.601-.767L5.467 4.08v-.608l2.987-2.134a.667.667 0 00.28-.543V-.1l-.51.318L4.57 2.5h-.73L.66.229.572.167H0z"
                  />
                  <path
                    fill="url(#paint0_linear_374_135177)"
                    fillRule="evenodd"
                    d="M0 2.833V4.7h3.267v2.133c0 .369.298.667.666.667h.534a.667.667 0 00.666-.667V4.7H8.2a.667.667 0 00.667-.667V3.5a.667.667 0 00-.667-.667H5.133V.5H3.267v2.333H0z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="url(#paint1_linear_374_135177)"
                    fillRule="evenodd"
                    d="M0 3.3h3.733V.5h.934v2.8H8.4v.933H4.667v2.8h-.934v-2.8H0V3.3z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M4.2 11.933l-.823.433.157-.916-.666-.65.92-.133.412-.834.411.834.92.134-.665.649.157.916-.823-.433zm9.8.7l-.66.194.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.194zm0-8.866l-.66.193.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.193zm2.8 2.8l-.66.193.193-.66-.193-.66.66.193.66-.193-.193.66.193.66-.66-.193zm-5.6.933l-.66.193.193-.66-.193-.66.66.194.66-.194-.193.66.193.66-.66-.193zm4.2 1.167l-.33.096.096-.33-.096-.33.33.097.33-.097-.097.33.097.33-.33-.096z"
                    clipRule="evenodd"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_374_135177"
                    x1="0"
                    x2="0"
                    y1=".5"
                    y2="7.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#fff" />
                    <stop offset="1" stopColor="#F0F0F0" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_374_135177"
                    x1="0"
                    x2="0"
                    y1=".5"
                    y2="7.033"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF2E3B" />
                    <stop offset="1" stopColor="#FC0D1B" />
                  </linearGradient>
                </defs>
              </svg>
              Australia (+61)
            </span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 text-sm hover:bg-neutral-100"
            role="menuitem"
          >
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 me-2" fill="none" viewBox="0 0 20 15">
                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                <mask
                  id="a"
                  style={{ maskType: 'luminance' }}
                  width="20"
                  height="15"
                  x="0"
                  y="0"
                  maskUnits="userSpaceOnUse"
                >
                  <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                </mask>
                <g mask="url(#a)">
                  <path
                    fill="#262626"
                    fillRule="evenodd"
                    d="M0 5.167h19.6V.5H0v4.667z"
                    clipRule="evenodd"
                  />
                  <g filter="url(#filter0_d_374_135180)">
                    <path
                      fill="#F01515"
                      fillRule="evenodd"
                      d="M0 9.833h19.6V5.167H0v4.666z"
                      clipRule="evenodd"
                    />
                  </g>
                  <g filter="url(#filter1_d_374_135180)">
                    <path
                      fill="#FFD521"
                      fillRule="evenodd"
                      d="M0 14.5h19.6V9.833H0V14.5z"
                      clipRule="evenodd"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_374_135180"
                    width="19.6"
                    height="4.667"
                    x="0"
                    y="5.167"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                    <feBlend
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_374_135180"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_374_135180"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_d_374_135180"
                    width="19.6"
                    height="4.667"
                    x="0"
                    y="9.833"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                    <feBlend
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_374_135180"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_374_135180"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              Germany (+49)
            </span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 text-sm hover:bg-neutral-100"
            role="menuitem"
          >
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 me-2" fill="none" viewBox="0 0 20 15">
                <rect
                  width="19.1"
                  height="13.5"
                  x=".25"
                  y=".75"
                  fill="#fff"
                  stroke="#F5F5F5"
                  strokeWidth=".5"
                  rx="1.75"
                />
                <mask
                  id="a"
                  style={{ maskType: 'luminance' }}
                  width="20"
                  height="15"
                  x="0"
                  y="0"
                  maskUnits="userSpaceOnUse"
                >
                  <rect
                    width="19.1"
                    height="13.5"
                    x=".25"
                    y=".75"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth=".5"
                    rx="1.75"
                  />
                </mask>
                <g mask="url(#a)">
                  <path fill="#F44653" d="M13.067.5H19.6v14h-6.533z" />
                  <path
                    fill="#1035BB"
                    fillRule="evenodd"
                    d="M0 14.5h6.533V.5H0v14z"
                    clipRule="evenodd"
                  />
                </g>
              </svg>
              France (+33)
            </span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 text-sm hover:bg-neutral-100"
            role="menuitem"
          >
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 me-2" fill="none" viewBox="0 0 20 15">
                <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                <mask
                  id="a"
                  style={{ maskType: 'luminance' }}
                  width="20"
                  height="15"
                  x="0"
                  y="0"
                  maskUnits="userSpaceOnUse"
                >
                  <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
                </mask>
                <g mask="url(#a)">
                  <path
                    fill="#262626"
                    fillRule="evenodd"
                    d="M0 5.167h19.6V.5H0v4.667z"
                    clipRule="evenodd"
                  />
                  <g filter="url(#filter0_d_374_135180)">
                    <path
                      fill="#F01515"
                      fillRule="evenodd"
                      d="M0 9.833h19.6V5.167H0v4.666z"
                      clipRule="evenodd"
                    />
                  </g>
                  <g filter="url(#filter1_d_374_135180)">
                    <path
                      fill="#FFD521"
                      fillRule="evenodd"
                      d="M0 14.5h19.6V9.833H0V14.5z"
                      clipRule="evenodd"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_374_135180"
                    width="19.6"
                    height="4.667"
                    x="0"
                    y="5.167"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                    <feBlend
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_374_135180"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_374_135180"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_d_374_135180"
                    width="19.6"
                    height="4.667"
                    x="0"
                    y="9.833"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                    <feBlend
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_374_135180"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_374_135180"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              Germany (+49)
            </span>
          </button>
        </li>
      </ul>
    </div>
  )
}