"use client"
import React, { useState } from 'react'
import Slot from './Slot';

type Props = {};

const slots: any[] = [];
const numrows = 32;

// dummy data 
for (let i = 0; i < numrows; i++) {
    slots.push(<Slot key={i} />);
}

const EpochRow = (props: Props) => {
    return (
        <div className="space-y-16 py-16 xl:space-y-20">
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
              <h2 className="max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                Epochs
              </h2>
            </div>
            <div className="mt-6 overflow-hidden border-t border-gray-300">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                  <table className="w-full text-left">
                    <tbody>
                        <tr className='flex my-2'>{slots}</tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default EpochRow