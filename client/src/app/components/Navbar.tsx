/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
type Props = {};

const routes = [
    {
        title: 'Overview',
        href: '/'
    }
]

const Navbar = (props: Props) => {
  return (
      <header>
        <div className='max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='relative flex flex-row items-center justify-start py-5 lg:justify-between'>
            {/* left side */}
            <div className='flex flex-row items-center'>
              <a href='/' className='text-gray-50'>
                Devnet Preconf Dashboard
              </a>
              {/* <nav className="flex flex-row items-center gap-5 lg:gap-6 mx-4">
                {routes.map((route, index) => (
                <Link
                    key={index}
                    href={route.href}
                    className="text-gray-500 font-medium text-sm w-20 dark:text-gray-400"
                    prefetch={false}
                >
                    {route.title}
                </Link>
                ))}
                </nav> */}
            </div>

            {/* Right section on desktop */}
            <div className='hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5'>
            </div>
          </div>
        </div>
      </header>
  )
};

export default Navbar;
