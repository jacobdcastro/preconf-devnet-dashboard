"use client"
import React from 'react';
import { cn } from '@/lib/utils';
import { ISlot } from '@/models/preconf';

const EpochRow = ({currentEpoch, currentEpochProposers, slotIndex}: ISlot) => {

    return (
        <div className="space-y-8 py-8 xl:space-y-20 max-w-6xl">
          <div>
            <div className="flex justify-between">
              <h2 className=" text-base font-semibold leading-6 text-gray-200 lg:mx-0 lg:max-w-none">
                Epoch {currentEpoch ? currentEpoch : ''}
              </h2>
              <h2 className="text-base font-semibold leading-6 text-gray-200 flex-end">
                {slotIndex && slotIndex >= 0 ? <span>{slotIndex} / 32 </span> : ' '} 
              </h2>
            </div>
            <div className="mt-6 overflow-hidden ">
              <div className="mx-auto">
                <div className="mx-auto lg:mx-0 ">
                  <table className="w-full text-left border-t border-gray-700">
                    <tbody>
                        <tr className='flex my-2 '>
                            {currentEpochProposers && slotIndex ? currentEpochProposers.map((slot:any, index:number) => (
                                <td key={index} className={cn("flex mx-[.5px]", {"animate-pulse": slot.slot % 32 === slotIndex})}>
                                    <div className={cn("w-[33px] h-14 rounded bg-green-700", {"bg-gray-300":slot.slot % 32 === slotIndex}, {"bg-zinc-800": slot.slot % 32 > slotIndex})}></div>
                                </td>
                            )) : null}
                        </tr>
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