import React, { ReactNode } from 'react';
type Props = {
    children: ReactNode;
};

const MainContentWrapper = ({children}: Props) => {
    return (
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
    )
}

export default MainContentWrapper