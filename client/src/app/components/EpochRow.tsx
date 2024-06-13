"use client";
import React, { useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import LookAheadToolTip from "./Lookahead";
import { ApiDataContext } from "@/components/apiDataContext";

const EpochRow = () => {
  const data = useContext(ApiDataContext);
  const slotIndex = data?.slot?.slotIndex;
  const currentEpochProposers = data?.slot?.currentEpochProposers;

  return (
    <div className="space-y-8 py-8 xl:space-y-20 w-full">
      <div>
        <div className="flex justify-between max-w-6xl">
          <h2 className="text-3xl font-semibold leading-6 text-gray-200">
            Epoch {data?.slot?.currentEpoch}
          </h2>
          <h2 className="text-xl font-semibold leading-6 text-gray-200 flex-end">
            {slotIndex ? (
              <span>
                <span className="mr-3">Slot:</span>
                {slotIndex + 1} / 32{" "}
              </span>
            ) : (
              " "
            )}
          </h2>
        </div>
        <div className="mt-6 overflow-hidden">
          <div className="mx-auto flex">
            <div className="mx-auto lg:mx-0">
              <div className="w-full text-left border-t border-gray-700">
                <div className="grid grid-cols-[repeat(32,_minmax(0,_1fr))] gap-[1.2px] my-2">
                  {currentEpochProposers && slotIndex !== undefined
                    ? currentEpochProposers.map((slot, index) => (
                        <div
                          key={index}
                          className={cn("w-[32px] h-10 rounded", {
                            "animate-pulse":
                              parseInt(slot.slot) % 32 === slotIndex,
                            "bg-green-700":
                              parseInt(slot.slot) % 32 !== slotIndex,
                            "bg-gray-300":
                              parseInt(slot.slot) % 32 === slotIndex,
                            "bg-zinc-800": parseInt(slot.slot) % 32 > slotIndex,
                          })}
                        ></div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpochRow;
