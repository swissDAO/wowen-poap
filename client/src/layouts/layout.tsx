import { type ReactNode } from 'react';
import { CustomConnectButton } from '~/components/connect-button';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="block w-full px-8 shadow-md backdrop-saturate-200 backdrop-blur-2xl sticky top-0 z-10 py-5 lg:px-16 lg:py-7 max-w-full bg-wowen bg-opacity-100 text-rtm-white font-semibold rounded-none">
        <div className="relative w-auto h-fit flex items-center">
          <a className="hidden lg:block cursor-pointer active" href="" aria-current="page">
            <img src="https://www.wowen.io/static/media/Wowen_white.bc50c8aa3083ed679764922c2aa5fc26.svg" className="h-fit" alt="Wowen Logo" />
          </a>

          <div className="left-0">
            <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[48px] h-12 max-h-[48px] rounded-lg text-sm text-blue-500 active:bg-blue-500/30 mr-2 lg:hidden hover:bg-rtm-green-400" type="button">
              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" className="svg-inline--fa fa-bars fa-2xl text-rtm-green-300" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z">
                  </path>
                </svg>
              </span>
            </button>
          </div>
          <div className="flex items-center float-right ml-auto">
            {/* <button className="align-middle select-none font-sans transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 px-6 text-white shadow-blue-500/20 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none normal-case text-center rounded-lg cursor-pointer hover:shadow-rtm-green-400/30 shadow-none h-full text-base font-semibold w-fit bg-rtm-green-400 border-2 border-rtm-green-300 mr-4" type="button">
          <div className="flex items-center">
            <div className="flex justify-center w-full">
              <p>Learn more</p>
            </div>
          </div>
        </button> */}

            <CustomConnectButton />
          </div>
        </div>
      </nav>

      {children}
    </>
  );
}