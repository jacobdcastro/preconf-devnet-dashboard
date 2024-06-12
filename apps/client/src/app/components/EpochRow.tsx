"use client"
import React, {useEffect, useState} from 'react';
import { cn } from '@/lib/utils';

const EpochRow = (data: any) => {
    const [currentEpoch, setCurrentEpoch] = useState(null);
    const [slotIndex, setSlotIndex] = useState(0);
    const [currentEpochProposers, setCurrentEpochProposers] = useState([])

    useEffect(() => {
        console.log(data.data)
        setSlotIndex(data.data?.slot.slotIndex)
        setCurrentEpoch(data.data?.slot.currentEpoch);
        setCurrentEpochProposers(data.data?.slot.currentEpochProposers)
      }, [data, slotIndex, currentEpochProposers]);
    
    return (
        <div className="space-y-8 py-8 xl:space-y-20">
          <div>
            <div className="max-w-6xl ">
              <h2 className="max-w-5xl text-base font-semibold leading-6 text-gray-200 lg:mx-0 lg:max-w-none">
                Epoch {currentEpoch ? currentEpoch : ''}
              </h2>
            </div>
            <div className="mt-6 overflow-hidden border-t border-gray-700 max-w-4xl">
              <div className="mx-auto">
                <div className="mx-auto max-w-6xl lg:mx-0 ">
                  <table className="w-full text-left">
                    <tbody>
                        <tr className='flex my-2 '>
                            {currentEpochProposers && currentEpochProposers.map((slot:any, index:number) => (
                                <td key={index} className={cn("flex mx-1", {"animate-pulse": slot.slot % 32 === slotIndex})}>
                                    <div className={cn("w-5 h-8 rounded bg-green-700", {"bg-gray-300":slot.slot % 32 === slotIndex}, {"bg-zinc-800": slot.slot % 32 > slotIndex})}></div>
                                </td>
                            ))}
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