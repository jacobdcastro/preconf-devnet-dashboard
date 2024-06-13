import React, { ReactNode } from 'react';
type Props = {
    children: ReactNode;
};

const MainContentWrapper = ({children}: Props) => {
    return (
        <div className="py-8 flex">
          <main>
            <div className="mx-auto sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
    )
}

export default MainContentWrapper