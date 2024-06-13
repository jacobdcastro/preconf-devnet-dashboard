"use client";
import React, { useContext } from "react";
import { cn } from "@/lib/utils";
import { ISlot } from "@/interfaces/preconf";
import { ApiDataContext } from "../page";
import LookAheadToolTip from "./Lookahead";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const EpochRow = () => {
  const data = useContext(ApiDataContext);
  const slotIndex = data?.slot.slotIndex - 1;
  const currentEpochProposers = data?.slot.currentEpochProposers;

  return (
    <div className="space-y-8 py-8 xl:space-y-20 max-w-6xl">
      <div>
        <div className="flex justify-between">
          <h2 className="text-3xl font-semibold leading-6 text-gray-200 lg:mx-0 lg:max-w-none">
            Epoch {data?.slot.currentEpoch}
          </h2>
          <h2 className="text-xl font-semibold leading-6 text-gray-200 flex-end">
            {slotIndex && slotIndex >= 0 ? (
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
          <div className="mx-auto">
            <div className="mx-auto lg:mx-0">
              <div className="w-full text-left border-t border-gray-700">
                <div className="grid grid-cols-[repeat(32,_minmax(0,_1fr))] gap-[0.5px] my-2">
                  {currentEpochProposers && slotIndex
                    ? currentEpochProposers.map((slot, index) => (
                        <div
                          key={index}
                          className={cn("h-10 rounded", {
                            // "animate-pulse": slot.slot % 32 === slotIndex,
                            // "bg-green-700": slot.slot % 32 !== slotIndex,
                            // "bg-gray-300": slot.slot % 32 === slotIndex,
                            // "bg-zinc-800": slot.slot % 32 > slotIndex,
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
