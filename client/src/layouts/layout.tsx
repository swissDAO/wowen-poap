import { type ReactNode } from 'react';
import { CustomConnectButton } from '~/components/connect-button';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="block w-full px-8 shadow-md backdrop-saturate-200 backdrop-blur-2xl sticky top-0 z-10 py-5 lg:px-16 lg:py-7 max-w-full bg-wowen bg-opacity-100 text-rtm-white font-semibold rounded-none">
        <div className="relative w-auto h-fit flex items-center justify-between">
          <a className="hidden lg:block cursor-pointer active" href="/" aria-current="page">
            <img src="https://www.wowen.io/static/media/Wowen_white.bc50c8aa3083ed679764922c2aa5fc26.svg" className="h-fit" alt="Wowen Logo" />
          </a>

          <ul className="h-fit mt-2 flex flex-col xl:gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center truncate">
            <a className="rounded-lg py-2 px-2 2xl:px-4 font-sans text-white" href="/gallery">
              Gallery
            </a>
          </ul>

          <div className="flex items-center">
            <CustomConnectButton />
          </div>
        </div>
      </nav>

      {children}
    </>
  );
}